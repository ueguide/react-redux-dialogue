import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { unsetMessage } from '../actions'

export const ModalMessage = ( props ) => {
  const { message, closeModal } = props
  const show = Boolean( message )

  if ( !show ) {
    return null
  }
  
  return (
    <Modal
      show
      onHide={closeModal}
      id="__dialogueModal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {message.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message.body &&
          <div
            dangerouslySetInnerHTML={{
              __html: message.body
            }}
          />
        }
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={closeModal}>
          {'Close'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalMessage.propTypes = {
  message: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string
  }),
  closeModal: PropTypes.func.isRequired
}

const mapStateToProps = ( state ) => {
  return {
    message: state.dialogue.message
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    closeModal: () => {
      dispatch( unsetMessage() )
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( ModalMessage )
