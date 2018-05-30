// TimerRow.js
// Yuan Wang

import React, { Component } from 'react';
import axios from 'axios';
import { White, Red, PrimaryColor } from '../global/Colors.js'
import { Line, Circle } from 'rc-progress';
// import { Progress } from 'antd';
import CircularProgressbar from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { formatNumber } from '../helpers/format.js'
import { connect } from "react-redux";

const __FRAME_DURATION__ = 100 
const __DEATH_TIME__ = 500
const __DEATH_FRAME_DURATION__ = 50

const mapStateToProps = state => {
  return { time: state.time };
};

class ConnectedTimerRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      live: 0,
      progress: 0.0,
      lifecycle: 'live',
      deathCountdown: __DEATH_TIME__,

    }
    // Amount by which to increment progress for each frame refresh
    this.delta = __FRAME_DURATION__ / this.props.duration 
  }

  componentDidMount() {
    this.timeout()
    this.interval = setInterval(() => this.increment(), __FRAME_DURATION__)
  }

  increment() {
  	if (this.state.progress < 1) {
	  	this.setState({progress:  Math.min(this.state.progress + this.delta, 1)})
	  }
	  else {
	  	clearInterval(this.interval)
      this.die()
	  }
  }

  // after no response, becomes timeout
  timeout() {

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

  die() {
    // this.props.killer()
  }

  render() {
    if (this.state.lifecycle != 'nan') {
      return this.renderContent()
    }

    // return (
    //     <CSSTransition
    //       in={this.state.lifecycle != 'dead'}
    //       timeout={{
    //         enter: 300,
    //         exit: 500
    //       }}
    //       classNames={"timer"}
    //       unmountOnExit
    //       exit
    //       >
    //       <div>
    //         { content }
    //       </div>
    //     </CSSTransition>
    //   )
  }

  renderContent() {

    var options = {
    	strokeWidth: 2
    };

    // For demo purposes so the container has some dimensions.
    // Otherwise progress bar won't be shown
    var containerStyle = {
      width: '200px',
      height: '200px'
    };
    
    var percentage = Math.min(
      Math.max(
        100 * (this.props.time - this.props.start ) / this.props.duration , 
        0), 
      100);

    return (
    	<div 
    		className='box2'
    		style={{
          ...styles.container,
          ...{
            maxHeight: 200 * (this.state.deathCountdown / __DEATH_TIME__)
          }
        }}
    		>

    		<div style={styles.timerContainer}>

	    		<CircularProgressbar 
            percentage={Math.round(percentage, 2)}
            textForPercentage={ 
              (pct) => `${((100 - pct) * this.props.duration / 100000).toFixed(2) } s`
            }

            styles={{
              text: { 
                stroke: Red(percentage / 100),
                fill: Red(percentage / 100)
              },
              path: { 
                stroke: Red(percentage / 200 + .5) 
              },
            }} />
	      </div>
        <div style={styles.pane}>
		      <h1 
		        style={{
		          ...styles.whiteText,
		          ...{
		            color: White(1)
		          }
		        }}>
		        {this.props.name}

		      </h1>
	      </div>
	    </div>
    )

  }
}

ConnectedTimerRow.defaultProps = {
	duration: 5000,
	start: 2000
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: White(0.2),
		borderRadius: 10,
		padding: 10,
		margin: 10,
		height: 200,
	},
	timerContainer: {
		display: 'flex',
		flex: 0,
    minWidth: 180,
    padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pane: {
		display: 'flex',
    paddingLeft: 30,
		flex: 2
	},
  whiteText: {
    color: 'white',
    textAlign: 'start'
  }
}

const TimerRow = connect(mapStateToProps)(ConnectedTimerRow);

export default TimerRow
