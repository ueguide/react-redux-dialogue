import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { unsetFlashAlert } from '../actions'
import { selectFlashAlert } from '../selectors'

class FlashAlert extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {
      forceClose: false
    }
  }
  componentDidMount() {
    if ( !this.props.location ) {

    }
  }
  componentWillUnmount() {
    window.onpopstate = null
  }
  componentWillReceiveProps( nextProps ) {
    console.log("flash will receive props", this.props, nextProps )
    /*
    const { history: { action }, flashAlert, closeAlert } = this.props

    // if flashAlert is present and route is changing, remove current alert
    if ( flashAlert && action === 'PUSH' ) {
      closeAlert()
    }
    */
  }
  
  shouldComponentUpdate( nextProps ) {
    // only update when flashAlert prop has changed
    return JSON.stringify( this.props.flashAlert ) !== JSON.stringify( nextProps.flashAlert )
  }

  render() {
    const { id, outerClass, innerClass, flashAlert, closeAlert, canClose } = this.props
    
    if ( !flashAlert ) {
      return null
    }

    const [ bsStyle, message ] = flashAlert

    return (
      <div className={outerClass} id={id}>
        <Alert bsStyle={bsStyle} onDismiss={closeAlert}>
          <div className={innerClass}>
            {message}
          </div>
        </Alert>
      </div>
    )
  }
}

FlashAlert.defaultProps = {
  canClose: false
}

FlashAlert.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  outerClass: PropTypes.string,
  innerClass: PropTypes.string,
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