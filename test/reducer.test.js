import reducer from '../src/reducer'
import { 
  setFlashAlert, 
  removeFlashAlert,
  setMessage,
  unsetMessage
} from '../src/actions'

describe('reducer', () => {
  const flashAlert = [
    'warning', 'Test Flash Alert'
  ]
  const message = {
    title: 'Attention',
    body: '<p>This is a message.</p>'
  }
  
  it('should handle setFlashAlert', () => {
    const _expected = { flashAlert }
    expect(reducer({}, setFlashAlert(flashAlert))).toEqual(_expected)
  })
  
  it('should handle removeFlashAlert', () => {
    expect(reducer({flashAlert}, removeFlashAlert())).toEqual({flashAlert: null})
  })
  
  it('should handle setMessage', () => {
    const _expected = { message }
    expect(reducer({}, setMessage(message))).toEqual(_expected)
  })
  
  it('should handle unsetMessage', () => {
    expect(reducer({message}, unsetMessage())).toEqual({message: null})
  })
  
})