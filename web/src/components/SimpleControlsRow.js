// SimpleControlsRow.js
// Yuan Wang

import React, { Component } from 'react';
import axios from 'axios'
import { White, PrimaryColor, Red, Yellow } from '../global/Colors.js'
import { __PYRO_PORT__, __DEVICE_HOT_TIMEOUT__, __DEVICE_CHECK_TIMEOUT__ } from '../global/config.js'
import { Button, ButtonToolbar } from 'react-bootstrap'

export default class SimpleControlsRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      live: 0,
      status: 'unsure'
    }
    this.checkDevice = this.checkDevice.bind(this)
    this.timeout = this.timeout.bind(this)
    this.fire = this.fire.bind(this)
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
        live: res.data.live ? 1 : -1,
        status: res.data.live ? 'armed' : 'dead'
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
        this.setState({ live: -1, status: 'dead' })
    }
    }.bind(this) , __DEVICE_CHECK_TIMEOUT__)
  }

  fire() {
    var ip = this.props.device.ip
    var dest = ip + ":5000"
    var target = 'test'
    console.log("Firing at", dest)
    axios.get(dest, {
      params: {
        target: target
      }
    })
    .then(function(response) {
      console.loog("Fired " + target)
      // res.send(response.data)
    })
    .catch(function(error) {
      console.log(error);
      console.log("Target " + target + " not connected")
    })

    this.setState(
      { status: 'hot' }
    ) 
    setTimeout( function() {
      this.setState({ status: 'cool' })
    }.bind(this) , __DEVICE_HOT_TIMEOUT__ )

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

    var containerHighlight;
    switch(this.state.status) {
      case 'hot': 
        containerHighlight = Red(0.8)
        break;

      case 'armed': 
        containerHighlight = White(0.2)
        break;

      case 'unsure': 
        containerHighlight = Yellow(0.2)
        break;

      default: 
        containerHighlight = White(0.1)
    }

    return (
      <div 
        className='box3'
        style={{
          ...styles.container,
          ...{
            backgroundColor: containerHighlight,
          }}}>
        <div>
          <h2
            style={{
              ...styles.whiteText,
              ...{
                color: highlight
              }
            }}>
            {this.props.device.name}
          </h2>
        </div>
        <div style={styles.buttonContainer}>
          <ButtonToolbar>

            
            <Button 
              
              onClick={this.fire} 
              bsStyle="danger">
              Fire
            </Button>

          </ButtonToolbar>
        </div>
      </div>
    )

  }
}

const styles = {
  container: {
    
    height: 60,
    flex: 1,
    display: 'flex',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,


  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 0
  },
  whiteText: {
    paddingTop: 5,
    color: 'white',
    textAlign: 'start'
  }
}