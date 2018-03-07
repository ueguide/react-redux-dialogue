import React from 'react'
import { Alert } from 'react-bootstrap'
import { RoutedFlashAlert } from '../../src/components/RoutedFlashAlert'
import FlashAlert from '../../src/components/FlashAlert'

describe('RoutedFlashAlert component', () => {
  
  let wrapper
  const closeAlert = jest.fn()
  const flashAlert = [
    'warning', 'Test Flash Alert'
  ]
  const history = {
    action: 'PUSH'
  }
  
  beforeEach( () => {
    wrapper = shallow(
      <RoutedFlashAlert 
        closeAlert={closeAlert} 
        flashAlert={flashAlert} 
        history={history}
      />)
  })
  
  it('should render', () => {
    // assert returns the connected FlashAlert component
    expect(wrapper.find(FlashAlert)).toHaveLength(1)
  })
  
  
})