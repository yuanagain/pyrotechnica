import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

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
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'green',
    paddingLeft: 10,
  },
  title: {
    textAlign: 'start'
  }
}

class App extends Component {

  fire() {
    axios.get("/fire")
    console.log("Firing")
  }

  render() {
    return (
      <div 
        className="App" 
        style={styles.container}>
        <Header/>
        <div style={styles.body}>
          <div style={styles.sidebar}>  
            <h1>
              Unit 1
            </h1>
          </div>
          <div style={styles.mainbody}>
            <h1>
              Body
            </h1>
            <a  textDecoration="none" 
                style={styles.cleanLink} 
                href='#' onClick={this.fire}>
              <h2 >
                Fire me
              </h2>
            </a>
          </div>
        </div>
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
    minWidth: 300,
    backgroundColor: 'lightblue',
    display: 'flex',
  },
  mainbody: {
    flexDirection: 'column',
    flex: 4,
    display: 'flex', 
    backgroundColor: 'lightgreen'
  },
  cleanLink: {
    textDecoration: 'none'
  }
}

export default App;
