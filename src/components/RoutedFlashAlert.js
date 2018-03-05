import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import FlashAlert from './FlashAlert'

const RoutedFlashAlert = ( props ) => {
  return <FlashAlert {...props} />
}

export default withRouter( RoutedFlashAlert )