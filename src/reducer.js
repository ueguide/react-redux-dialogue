import {
  SET_FLASH_ALERT
} from './actionTypes'

const behaviors = {
  [SET_FLASH_ALERT]( state, { flashAlert } ) {

    return Object.assign( {}, state, {
      flashAlert
    })
  }
}

export const reducer = ( state = {}, action ) => {
  const behavior = behaviors[action.type]

  return behavior ? behavior(state, action) : state
}

export default reducer
