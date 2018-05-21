import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import BackgroundImage from './components/BackgroundImage.js'
import { __COMPONENT_STYLES__ } from './Styles.js'
import { White, PrimaryColor } from './Colors.js'

// https://emeraldcoastbyowner.com/blogimages/blog31508863253_gulf-breeze2.jpg
const __PYRO_PORT__ = 5000
const __DEVICE_CHECK_TIMEOUT__ = 5000
const __BACKGROUND_IMAGE_URL__ = "https://www.gannett-cdn.com/-mm-/c5cb33fa1f894aa6e0b5df97512504daf89995ab/c=0-803-3456-2756&r=x1683&c=3200x1680/local/-/media/2017/04/04/NJGroup/AsburyPark/636269042204056588-fireworks-freehold-raceway-2016-Kenny-Murray.jpg"

class Header extends Component {
  render() {
    return (  
      <div style={headerStyles.container}>
        <h1 style={headerStyles.title}>Pyrotechnica</h1>
      </div>
    )
  }
}

class DeviceRow extends Component {
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

const headerStyles = {
  container: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'lightred',
  },
  title: {
    textAlign: 'start',
    color: 'white'
  }
}

const makeEndpoint = (ip, port, endpoint) => {
  return 'http://' + ip + ':' + port + '/' + endpoint
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      devices: [],
      targets: []
    }
    this.scan = this.scan.bind(this)
  }

  componentDidMount() {
    this.scan()
  }

  // fires on a target
  fire() {
    console.log("Firing")
    axios.get("/fire")
    .then(function (response) {
      console.log("fired")
    }).catch(function (error) {
      console.log(error)
    })
  }

  // Scans for ignition targets
  scan() {
    this.setState({targets: []})
    axios.get("/scan")
    .then(function (response) {
      console.log("Scan successful")
      var devices = response.data
      this.setState({ devices }, this.checkDevices())

    }.bind(this))
    .catch(function (error) {
      console.log(error)
      console.log("Scan unsuccessful")
    })
  }

  render() {

    return (
      <div 
        className="App" 
        style={styles.container}>
        <BackgroundImage 
          contentStyle={{
            ...__COMPONENT_STYLES__.jumboContent,
            ...styles.content
          }}
          background={"url(" + __BACKGROUND_IMAGE_URL__ + ")"}>
          <Header/>
          <div style={styles.hline} />
          <div style={styles.body}>
            <div style={styles.sidebar}>  
              <h1 style={styles.whiteText}>
                Unit 1
              </h1>
              <a  textDecoration="none" 
                  style={styles.cleanLink} 
                  href='#' onClick={this.scan}>
                <h2 
                  style={styles.whiteText}>
                  Scan
                </h2>

                <h4 style={styles.whiteText}>
                  {"Number of Devices: " + this.state.devices.length}
                </h4>
                <br/>

                {
                  this.state.devices.map( (item, index) =>
                      <DeviceRow
                        device={item}
                        key={index}/>
                  )
                }
              </a>
            </div>
            <div style={styles.mainbody}>
              <h1 style={styles.whiteText}>
                Body
              </h1>
              <a  textDecoration="none" 
                  style={styles.cleanLink} 
                  href='#' onClick={this.fire}>
                <h2 style={styles.whiteText}>
                  Fire me
                </h2>
              </a>
            </div>
          </div>
        </BackgroundImage>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  body: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    display: 'flex'
  },
  sidebar: {  
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    minWidth: 300,
    display: 'flex',
  },
  mainbody: {
    flexDirection: 'column',
    flex: 4,
    display: 'flex', 
  },
  cleanLink: {
    textDecoration: 'none'
  },
  whiteText: {
    color: 'white',
    textAlign: 'start'
  },
  content: {
    display: 'flex',
    flex: 1,
    paddingLeft: 24,
  },
  hline: {
    backgroundColor: White(1),
    maxHeight: 1,
    flex: 2,
    width: 400
  }
}

export default App;
