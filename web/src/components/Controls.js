// components/Controls.js
// Yuan Wang

import React, { Component } from 'react';
import { connect } from "react-redux";
import { elapseTime } from "../js/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    elapseTime: (dt) => dispatch(elapseTime(dt))
  };
};

class ConnectedControls extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      paused: true
    }
    this.togglePlay = this.togglePlay.bind(this)
  }

  togglePlay() {
    if (this.state.paused) {
      this.timer  = setInterval(() => this.props.elapseTime(10), 10);
    } 
    else {
      clearInterval(this.timer)
    }

    this.setState({
      paused: !this.state.paused
    })
    
  }

  render() {
    return (
      <a  
        textDecoration="none" 
          style={styles.cleanLink} 
          href='#' 
          onClick={ 
            () => this.togglePlay() 
          }>
        <h2 
          style={styles.whiteText}>
          {this.state.paused ? "Play" : "Pause"}
        </h2>
      </a>
      )
  }
}

const styles = {
  cleanLink: {
    textDecoration: 'none'
  },
  whiteText: {
    color: 'white',
    textAlign: 'start'
  }
}

const Controls = connect(null, mapDispatchToProps)(ConnectedControls);

export default Controls