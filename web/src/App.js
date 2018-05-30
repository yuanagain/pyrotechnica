// App.js
// Yuan Wang

import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import BackgroundImage from './components/BackgroundImage.js'
import { __COMPONENT_STYLES__ } from './global/Styles.js'
import { White, PrimaryColor } from './global/Colors.js'

import TimerRow from './components/TimerRow.js'
import FlipMove from 'react-flip-move';
import ScrollArea from 'react-scrollbar'
import "react-circular-progressbar/dist/styles.css";


import { __DUMMY_TIMERS__ } from './helpers/filler.js'
import TimerList from './components/TimerList.js'
import Controls from './components/Controls.js'
import DeviceList from './components/DeviceList.js'

// REDUX
import { connect } from "react-redux";
import { addTimer } from "./js/actions/index";
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
      targets: [],
      timers: __DUMMY_TIMERS__
    }
    this.scan = this.scan.bind(this)
    this.killTimer = this.killTimer.bind(this)
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
      this.setState({ devices })

    }.bind(this))
    .catch(function (error) {
      console.log(error)
      console.log("Scan unsuccessful")
    })
  }

  killTimer(index) {
    this.state.timers.splice(index, 1)
    console.log(this.state.timers)
    this.setState({ timers: this.state.timers})
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
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
                Devices
              </h1>
              <a  textDecoration="none" 
                  style={styles.cleanLink} 
                  href='#' onClick={this.scan}>
                <DeviceList/>
              </a>
            </div>
            <div style={styles.mainbody}>
              <Controls/>
              <NewEvent/>

              <ScrollArea
                speed={0.8}
                style={styles.scroll}
                contentStyle={styles.scrollContent}
                horizontal={false}
                >
                <TimerList/>

              </ScrollArea>
              
            </div>
          </div>
        </BackgroundImage>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTimer: timer => dispatch(addTimer(timer))
  };
};

class ConnectedNewEvent extends Component {
  createNewEvent() {
    console.log("Creating new event")
    var timer = {
      name: 'New Timer', 
      duration: 10000,
      start: 200,
      latency: 0,
      fuse: 0
    }
    this.props.addTimer(timer);
  }

  render() {
    return (
      <a  
        textDecoration="none" 
          style={styles.cleanLink} 
          href='#' 
          onClick={ 
            () => this.createNewEvent() 
          }>
        <h2 
          style={styles.whiteText}>
          New Event
        </h2>
      </a>
      )

  }
}

const NewEvent = connect(null, mapDispatchToProps)(ConnectedNewEvent);

/*
                  <FlipMove
                    enterAnimation="accordionVertical"
                    leaveAnimation="accordionVertical"
                    duration={2000}
                  >
                    {
                    this.state.timers.sort(function(a, b) { return a.delay - b.delay } ).map(
                    (item, index) => <TimerRow {...item} key={item.name} killer={() => this.killTimer(index)} />
                    )}
                  </FlipMove>
*/

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
