import React from 'react'
import { Modal } from 'react-bootstrap'
import { ModalMessage } from '../../src/components/ModalMessage'

describe('ModalMessage component', () => {
  
  let wrapper
  const closeModal = jest.fn()
  const message = {
    title: 'Attention',
    body: '<p>This is a message.</p>'
  }
  
  it('should render Modal with message', () => {
    wrapper = shallow(<ModalMessage closeModal={closeModal} message={message} />)
    const modal = wrapper.find(Modal)
    expect(modal).toHaveLength(1)
    expect(modal.find(Modal.Header)).toHaveLength(1)
    expect(modal.find(Modal.Header).html())
      .toEqual('<div class="modal-header"><button type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title">Attention</h4></div>')
    // another option could use the enzyme render() method and chaining text() to 
    // get the plain text of the rendered node ie:
    // expect(modal.find(Modal.Body).render().text()).toEqual('This is a message.')
    expect(modal.find(Modal.Body)).toHaveLength(1)
    expect(modal.find(Modal.Body).html())
      .toEqual('<div class="modal-body"><div><p>This is a message.</p></div></div>')
    expect(modal.find(Modal.Footer)).toHaveLength(1)
    expect(modal.find(Modal.Footer).html())
      .toEqual('<div class="modal-footer"><button type="button" class="btn btn-danger">Close</button></div>')
  })

  it('should render null without message', () => {
    wrapper = shallow(<ModalMessage closeModal={closeModal} message={null} />)
    expect(wrapper.html()).toEqual(null)
  })
})