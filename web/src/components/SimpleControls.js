// components/Controls.js
// Yuan Wang

import React, { Component } from 'react';
import { connect } from "react-redux";
import { elapseTime } from "../js/actions/index";
import SimpleControlsRow from '../components/SimpleControlsRow.js'

const mapStateToProps = state => {
  return { 
    devices: state.devices,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    elapseTime: (dt) => dispatch(elapseTime(dt))
  };
};

class ConnectedSimpleControls extends Component {
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
    console.log("rendering controls")
    return (
      <div>
        {
          this.props.devices.map( (item, index) =>
            <SimpleControlsRow
              device={item}
              key={index}/>
          )
        }
      </div>
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

const SimpleControls = connect(mapStateToProps, mapDispatchToProps)(ConnectedSimpleControls);

export default SimpleControls