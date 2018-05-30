// components/DeviceList.js
// Yuan Wang

import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { updateDevices } from "../js/actions/index";
import DeviceRow from '../components/DeviceRow.js'

const mapStateToProps = state => {
  return { 
  	devices: state.devices,
  };
};

const mapDispatchToProps = dispatch => {
  return { 
  	updateDevices: (devices) => dispatch(updateDevices(devices))
  };
};

class ConnectedDeviceList extends Component {
	constructor(props) {
		super(props)
		this.scan = this.scan.bind(this)
		this.state = {
			devices: []
		}
	}

	componentDidMount() {
    this.scan()
  }

	// Scans for ignition targets
  scan() {
    this.props.updateDevices([])
    axios.get("/scan")
    .then(function (response) {
      console.log("Scan successful")
      var devices = response.data
      this.props.updateDevices(devices)
      console.log(this.props.devices)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
      console.log("Scan unsuccessful")
    })
  }

	render() {
		return (
			<div>
				<h2 
		      style={styles.whiteText}>
		      Scan
		    </h2>

		    <h4 style={styles.whiteText}>
		      {"Number of Devices: " + this.props.devices.length}
		    </h4>
		    <br/>

		    {
		      this.props.devices.map( (item, index) =>
	          <DeviceRow
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

const DeviceList = connect(mapStateToProps, mapDispatchToProps)(ConnectedDeviceList);

export default DeviceList;
