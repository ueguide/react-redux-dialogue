import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { unsetFlashAlert } from '../src/actions'
import { UNSET_FLASH_ALERT } from '../src/actionTypes'
import config from '../src/config'

describe('actions', () => {
  const flashAlert = [
    'warning', 'Test Flash Alert'
  ]
  const middlewares = [ thunk ]
  let store
  let expected
  
  it('should handle unsetFlashAlert when flashAlert in store', () => {
    store = configureMockStore( middlewares )({
      dialogue: { flashAlert }
    })
    expected = [
      { type: UNSET_FLASH_ALERT}
    ]
    store.dispatch(unsetFlashAlert())
    expect(store.getActions()).toEqual(expect.arrayContaining(expected))
  })
  
  it('should handle unsetFlashAlert when flashAlert in location', () => {
    jsdom.reconfigure({
      url: "https://www.example.com/?url_flash=true"
    })
    const replaceState = jest.fn()
    window.history.replaceState = replaceState
    
    store = configureMockStore( middlewares )({
      dialogue: { flashAlert }
    })
    expected = [
      { type: UNSET_FLASH_ALERT}
    ]
    store.dispatch(unsetFlashAlert())
    expect(replaceState.mock.calls.length).toBe(1)
    expect(store.getActions()).toEqual(expect.arrayContaining(expected))
  })
  
  it('should handle unsetFlashAlert when flashAlert in routing.location', () => {
    store = configureMockStore( [ thunk ] )({
      dialogue: { flashAlert: null },
      routing: {
        location: {
          pathname: '/',
          search: '?url_flash=true',
          hash: ''
        }
      }
    })
    expected = [ 
      { type: '@@router/CALL_HISTORY_METHOD',
        payload: { 
          method: 'replace', 
          args: [{
            "hash": "",
            "pathname": "/",
            "search": "?",
          }]
        }
      } 
    ]
    store.dispatch(unsetFlashAlert())
    expect(store.getActions()).toEqual(expect.arrayContaining(expected))
  })
  
})