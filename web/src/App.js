// App.js
// Yuan Wang

import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import BackgroundImage from './components/BackgroundImage.js'
import { __COMPONENT_STYLES__ } from './global/Styles.js'
import { White, PrimaryColor } from './global/Colors.js'
import DeviceRow from './components/DeviceRow.js'
import TimerRow from './components/TimerRow.js'
import ScrollArea from 'react-scrollbar'
import "react-circular-progressbar/dist/styles.css";
import { __DUMMY_TIMERS__ } from './helpers/filler.js'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

// https://emeraldcoastbyowner.com/blogimages/blog31508863253_gulf-breeze2.jpg

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
      this.setState({ devices }, this.checkDevices)

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

              <ScrollArea
                speed={0.8}
                style={styles.scroll}
                contentStyle={styles.scrollContent}
                horizontal={false}
                >
                <TransitionGroup>
                  { __DUMMY_TIMERS__.sort(function(a, b) { return a.delay - b.delay } ).map(
                    (item, index) => <TimerRow {...item} key={item.name} />
                  )}
                </TransitionGroup>

              </ScrollArea>
              
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
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
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
  scroll: {
    maxHeight: '70vh',
    flex: 1,
  },
  scrollContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
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
    alignItems: 'stretch',
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
