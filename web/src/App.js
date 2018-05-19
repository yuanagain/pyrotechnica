import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import BackgroundImage from './components/BackgroundImage.js'
import { __COMPONENT_STYLES__ } from './Styles.js'
import { White } from './Colors.js'

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

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      targets: []
    }
    this.scan = this.scan.bind(this)
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
    axios.get("/scan")
    .then(function (response) {
      console.log("Scan successful")
      var targets = response.data
      this.setState({ targets })

    }.bind(this))
    .catch(function (error) {
      console.log(error)
      console.log("Scan unsuccessful")
    })
  }

  render() {
    console.log(this.state.targets)
    return (
      <div 
        className="App" 
        style={styles.container}>
        <BackgroundImage 
          contentStyle={{
            ...__COMPONENT_STYLES__.jumboContent,
            ...styles.content
          }}
          background="url(https://emeraldcoastbyowner.com/blogimages/blog31508863253_gulf-breeze2.jpg)">
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
                  {"Number of Devices: " + this.state.targets.length}
                </h4>
                <br/>

                {
                  this.state.targets.map( (item, index) =>
                      <h4 
                        style={styles.whiteText}
                        key={index}>
                        {item.name}
                      </h4>
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
