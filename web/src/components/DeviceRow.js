// DeviceRow.js
// Yuan Wang

import React, { Component } from 'react';
import axios from 'axios'
import { White, PrimaryColor } from '../global/Colors.js'
import { __PYRO_PORT__, __DEVICE_CHECK_TIMEOUT__ } from '../global/config.js'

export default class DeviceRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      live: 0
    }
    this.checkDevice = this.checkDevice.bind(this)
    this.timeout = this.timeout.bind(this)
  }

  // check if device is active
  checkDevice() {
    axios.get('/check', {
      params: {
        ip: this.props.device.ip,
        port: __PYRO_PORT__
      }
    })
    .then( function (res) {
      this.setState({
        live: res.data.live ? 1 : -1
      })
    }.bind(this))
    .catch( function (error) {
      console.log(error)
    })
  }

  componentDidMount() {
    this.checkDevice()
    this.timeout()
  }

  // after no response, becomes timeout
  timeout() {
    setTimeout( function() {
      if (this.state.live == 0) {
        this.setState({ live: -1 })
    }
    }.bind(this) , __DEVICE_CHECK_TIMEOUT__)
  }

  render() {
    var highlight;
    switch(this.state.live) {

      case 0:
        highlight = White(1)
        break;

      case -1:
        highlight = White(0.5)
        break;

      case 1:
        highlight = PrimaryColor(1)
        break;

      default:
        highlight = White(1)
    }

    return (
      <h4 
        style={{
          ...styles.whiteText,
          ...{
            color: highlight
          }
        }}>
        {this.props.device.name}
      </h4>
    )

  }
}

const styles = {
  whiteText: {
    color: 'white',
    textAlign: 'start'
  }
}