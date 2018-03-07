import { selectFlashAlert, selectMessage } from '../src/selectors'

describe('selectors', () => {
  const flashAlert = [
    'warning', 'Test Flash Alert'
  ]
  const message = {
    title: 'Attention',
    body: '<p>This is a message.</p>'
  }
  let state
  
  it('should handle selectFlashAlert when flashAlert in store', () => {
    state = {
      dialogue: {
        flashAlert
      }
    }
    expect(selectFlashAlert(state)).toEqual(flashAlert)
  })
  
  it('should handle selectFlashAlert when flashAlert in url params', () => {
    jsdom.reconfigure({
      url: "https://www.example.com/?url_flash=true"
    })
    state = {
      dialogue: {}
    }
    expect(selectFlashAlert(state)).toEqual([
      'info',
      'Custom Parameter Flash Message'
    ])
  })

  it('should handle selectMessage when message in store', () => {
    state = {
      dialogue: {
        message
      }
    }
    expect(selectMessage(state)).toEqual(message)
  })
  
})