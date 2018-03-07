import React from 'react'
import { Alert } from 'react-bootstrap'
import { FlashAlert } from '../../src/components/FlashAlert'

describe('FlashAlert component', () => {
  
  let wrapper
  let closeAlert
  const flashAlert = [
    'warning', 'Test Flash Alert'
  ]
  
  beforeEach( () => {
    closeAlert = jest.fn()
  })
  
  afterEach( () => {
    closeAlert.mockClear()
  })
  
  it('should render Alert with flashAlert', () => {
    wrapper = shallow(<FlashAlert closeAlert={closeAlert} flashAlert={flashAlert} />)
    expect(wrapper.find(Alert)).toHaveLength(1)
    expect(wrapper.find(Alert).html())
      .toEqual('<div role="alert" class="alert alert-warning alert-dismissable"><button type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close alert</span></button>Test Flash Alert</div>')
  })
  
  it('should render null without flashAlert', () => {
    wrapper = shallow(<FlashAlert closeAlert={closeAlert} />)
    expect(wrapper.html()).toEqual(null)
  })
  
  it('should hide close button when canClose is false', () => {
    wrapper = shallow(
      <FlashAlert 
        closeAlert={closeAlert} 
        flashAlert={flashAlert} 
        canClose={false} 
      />
    )
    expect(wrapper.find(Alert).html())
      .toEqual('<div role="alert" class="alert alert-warning">Test Flash Alert</div>')
  })
  
  it('should render with custom render prop', () => {
    wrapper = shallow(
      <FlashAlert 
        closeAlert={closeAlert} 
        flashAlert={flashAlert} 
        canClose={false} 
        render={props => {
          return (
            <div className={`custom-alert custom-alert-${props.flag}`}>
              {props.message}
            </div>
          )
        }}
      />
    )
    expect(wrapper.html())
      .toEqual('<div class="custom-alert custom-alert-warning">Test Flash Alert</div>')
  })
  
  it('should update with prop changes', () => {
    wrapper = shallow(<FlashAlert closeAlert={closeAlert} />)
    expect(wrapper.html()).toEqual(null)
    wrapper.setProps({flashAlert})
    expect(wrapper.find(Alert)).toHaveLength(1)
    wrapper.setProps({flashAlert: null})
    expect(wrapper.find(Alert)).toHaveLength(0)
  })
  
  it('should closeAlert when navigating away', () => {
    wrapper = shallow(
      <FlashAlert 
        closeAlert={closeAlert} 
        flashAlert={flashAlert} 
        history={{action: 'POP'}}
      />
    )
    // changing history should trigger componentWillReceiveProps and 
    // consequently call closeAlert
    wrapper.setProps({history: {
      action: 'PUSH'
    }})
    expect(closeAlert.mock.calls.length).toBe(1)
  })
  
  it('can closeAlert', () => {
    // use enzyme's mount() to get deeper nodes
    wrapper = mount(<FlashAlert closeAlert={closeAlert} flashAlert={flashAlert} />)
    wrapper.find('button').simulate('click')
    expect(closeAlert.mock.calls.length).toBe(1)
  })
  
})