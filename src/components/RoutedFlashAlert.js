import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { unsetFlashAlert } from '../actions'
import { selectFlashAlert } from '../selectors'

class FlashAlert extends React.Component {
  componentWillReceiveProps( nextProps ) {
    console.log('flash alert will receive props', this.props)
    const { history: { action }, flashAlert, closeAlert } = this.props

    // if flashAlert is present and route is changing, remove current alert
    if ( flashAlert && action === 'PUSH' ) {
      closeAlert()
    }
  }

  shouldComponentUpdate( nextProps ) {
    // only update when flashAlert prop has changed
    return JSON.stringify( this.props.flashAlert ) !== JSON.stringify( nextProps.flashAlert )
  }

  render() {
    const { flashAlert, location: { pathname }, closeAlert } = this.props
    if ( !flashAlert ) {
      return null
    }

    const [ alertClass, flashMessage ] = flashAlert

    return (
      <div
        className="row"
        id="flashAlert"
        className={pathname === '/' ? 'blueBg' : null}
      >
        <div
          className={'alert col-md12 '+alertClass}
          onClick={closeAlert}
          title={'Click to dismiss'}
        >
          {flashMessage}
        </div>
      </div>
    )
  }
}

FlashAlert.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  flashAlert: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ),
  closeAlert: PropTypes.func.isRequired
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

// wrap with withRouter to detect react-router changes in wrapped component
export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( FlashAlert ) )
