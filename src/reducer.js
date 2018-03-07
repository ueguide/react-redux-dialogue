import {
  SET_FLASH_ALERT,
  UNSET_FLASH_ALERT,
  SET_MESSAGE,
  UNSET_MESSAGE
} from './actionTypes'

const behaviors = {
  [SET_FLASH_ALERT]( state, { flashAlert } ) {

    return Object.assign( {}, state, {
      flashAlert
    })
  },
  [UNSET_FLASH_ALERT]( state ) {

    return Object.assign( {}, state, {
      flashAlert: null
    })
  },
  [SET_MESSAGE]( state, { message } ) {

    return Object.assign( {}, state, {
      message
    })
  },
  [UNSET_MESSAGE]( state ) {

    return Object.assign( {}, state, {
      message: null
    })
  }
}

export const reducer = ( state = {}, action ) => {
  const behavior = behaviors[action.type]

  return behavior ? behavior(state, action) : state
}

export default reducer
