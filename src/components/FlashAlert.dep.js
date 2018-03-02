import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { setFlashAlert, removeFlashAlert } from '../actions'
import { storedFlashAlert } from '../selectors'

const FlashAlert = ( props ) => {
  const { flashAlert, outerClass, innerClass, dismiss } = props

  if ( flashAlert ) {
    const close = () => {
      dismiss( flashAlert )
    }
    const { bsStyle, message } = flashAlert

    return (
      <div className={outerClass}>
        <Alert bsStyle={bsStyle} onDismiss={close}>
          <div className={innerClass}>
            {message}
          </div>
        </Alert>
      </div>
    )
  } else {
    return null
  }
}

FlashAlert.propTypes = {
  outerClass: PropTypes.string,
  innerClass: PropTypes.string,
  flashAlert: PropTypes.shape({
    bsStyle: PropTypes.string,
    message: PropTypes.string
  })
}

export default connect(
  ( state, ownProps ) => {
    return {
      flashAlert: storedFlashAlert( state, ownProps.selector )
    }
  },
  ( dispatch ) => {
    return {
      dismiss: ( flashAlert ) => {
        dispatch( removeFlashAlert( flashAlert ) )
      }
    }
  }
)( FlashAlert )
