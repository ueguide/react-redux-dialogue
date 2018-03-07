import reducer from '../src/reducer'
import { setFlashAlert, removeFlashAlert } from '../src/actions'

describe('reducer', () => {
  const flashAlert = [
    'warning', 'Test Flash Alert'
  ]
  
  it('should handle setFlashAlert', () => {
    const _expected = { flashAlert }
    expect(reducer({}, setFlashAlert(flashAlert))).toEqual(_expected)
  })
  
  it('should handle removeFlashAlert', () => {
    expect(reducer({flashAlert}, removeFlashAlert())).toEqual({flashAlert: null})
  })
})