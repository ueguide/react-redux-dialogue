import qs from 'qs'
import update from 'immutability-helper'
import { replace } from 'react-router-redux'
import * as types from './actionTypes'
import { config } from './config'

/**
 * Set flash alert to store 
 * 
 * @param {Array} flashAlert
 * @return {Object}
 */
export const setFlashAlert = ( flashAlert ) => {
  return {
    type: types.SET_FLASH_ALERT,
    flashAlert: flashAlert
  }
}

/**
 * Remove flash alert from store 
 * 
 * @return {Object}
 */
export const removeFlashAlert = () => {
  return {
    type: types.UNSET_FLASH_ALERT
  }
}

/**
 * Set modal message to store 
 * 
 * @param {Object} flashAlert
 * @return {Object}
 */
export const setMessage = ( message ) => {
  return {
    type: types.SET_MESSAGE,
    message: message
  }
}

/**
 * Remove modal message from store 
 * 
 * @return {Object}
 */
export const unsetMessage = () => {
  return {
    type: types.UNSET_MESSAGE
  }
}

/**
 * Replace url query string params when flash alert param removed
 * 
 * @param  {String} newQuery 
 * @return {void}          
 */
const replaceUrlQuery = ( newQuery ) => {
  return ( dispatch, getState ) => {
    const state = getState()
    
    // if app uses react-router-redux, state.routing will be set
    if ( state.routing ) {
      // create new, updated location object
      // use immutability helper in case there are nested
      // objects in location.state
      const newLocation = update( state.routing.location, {
        search: {
          $set: `?${newQuery}`
        }
      })
      // dispatch replaced location
      dispatch( replace( newLocation ) )
    // else default to use window location and history 
    } else {
      window.history.replaceState( 
        Object.assign( {}, window.history.state ), 
        '', 
        `${window.location.pathname}?${newQuery}` 
      )
      // even though query param flash alert isn't stored in state, dispatching 
      // the unset action will create a new version of state thus triggering 
      // component updates (which is needed to refetch the flash alert from 
      // the `selectFlashAlert` selector and its underlying `queryStringFlag`)
      dispatch( removeFlashAlert() )
    }
  }
}

/**
 * Unset flash alert
 * Will remove url query parameter flags and stored flashAlert if set
 *
 * @return {Function}
 */
export const unsetFlashAlert = () => {
  return ( dispatch, getState ) => {
    const state = getState()
    const { dialogue: { flashAlert } } = state
    const location = state.routing ? state.routing.location : window.location
    const { search } = location
    const query = qs.parse( search.substr( 1 ) )
    
    let newQuery = Object.assign({}, query )
    // look for query params that match customParamMessages
    for ( let key in config.customParamMessages ) {
      if ( !query[ key ] ) continue
      // remove flag from query params
      
      delete newQuery[ key ]
    }
    
    // if flash alert keys removed from query string, dispatch replacement 
    if ( JSON.stringify( query ) !== JSON.stringify( newQuery ) ) {
      dispatch( replaceUrlQuery( qs.stringify( newQuery ) ) )
    }
    
    // if flashAlert stored, remove
    if ( flashAlert ) {
      dispatch( removeFlashAlert() )
    }
  }
}
