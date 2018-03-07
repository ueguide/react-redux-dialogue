import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { unsetFlashAlert } from '../actions'
import { selectFlashAlert } from '../selectors'

export class FlashAlert extends React.Component {
  constructor( props ) {
    super( props )
  }

  componentWillReceiveProps( nextProps ) {
    if ( this.props.history ) {
      const { history: { action }, flashAlert, closeAlert } = nextProps
      if ( flashAlert && action === 'PUSH' ) {
        closeAlert()
      }
    }
  }
  
  shouldComponentUpdate( nextProps, nextState ) {
    // only update when flashAlert prop has changed
    return ( 
      JSON.stringify( this.props.flashAlert ) !== JSON.stringify( nextProps.flashAlert )
    )
  }

  render() {
    const { flashAlert, closeAlert, canClose, render: Component } = this.props

    if ( !flashAlert ) {
      return null
    }

    const [ flag, message ] = flashAlert
    
    if ( Component ) {
      const { flashAlert, ...propable } = this.props 
      
      return <Component {...this.propable} flag={flag} message={message} />
    } else {
      
      return (
        <Alert 
          bsStyle={flag} 
          onDismiss={canClose ? closeAlert : null}
        >
          {message}
        </Alert>
      )
    }
  }
}

FlashAlert.defaultProps = {
  canClose: true
}

FlashAlert.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  render: PropTypes.func,
  flashAlert: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ),
  closeAlert: PropTypes.func.isRequired,
  canClose: PropTypes.bool.isRequired
}

const mapStateToProps = ( state ) => {
  return {
    flashAlert: selectFlashAlert( state )
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    closeAlert: () => {
      dispatch( unsetFlashAlert() )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( FlashAlert )