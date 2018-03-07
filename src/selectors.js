import qs from 'qs'
import { createSelector } from 'reselect'
import { config } from '~/config'

/**
 * Get statically-defined flashAlert messages from query string flags
 *
 * @param  {Object} state
 * @return {Function}
 */
export const queryStringFlag = state => {
  let search = ''
  if ( !state.routing ) {
    search = window.location.search
  } else {
    search = state.routing.location.search
  }
  const query = qs.parse( search.substr( 1 ) )

  // look for query params that match customParamMessages
  for ( let key in config.customParamMessages ) {
    if ( query[ key ] ) {
      return config.customParamMessages[ key ]
    }
  }

  return null
}

/**
 * Get the flashAlert stored in state
 *
 * @param  {Object} state
 * @return {Function}
 */
export const storedFlashAlert = state => {
  return state.dialogue.flashAlert
}

/**
 * Create selector to get flash alert from redux store or url parameter flag
 *
 * @type {Function}
 */
export const selectFlashAlert = createSelector(
  queryStringFlag,
  storedFlashAlert,
  ( flag, flashAlert ) => {
    if ( flashAlert ) {
      return flashAlert
    } else if ( flag ) {
      return flag
    } else {
      return null
    }
  }
)

/**
 * Get the message stored in state
 *
 * @param  {Object} state
 * @return {Function}
 */
export const selectMessage = state => {
  return state.dialogue.message
}
