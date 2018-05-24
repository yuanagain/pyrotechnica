// TimerRow.js
// Yuan Wang

import React, { Component } from 'react';
import axios from 'axios';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { White, Red, PrimaryColor } from '../global/Colors.js'
import { Line, Circle } from 'rc-progress';
// import { Progress } from 'antd';
import CircularProgressbar from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { formatNumber } from '../helpers/format.js'

const __FRAME_DURATION__ = 100 

export default class TimerRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      live: 0,
      progress: 0.0,
      lifecycle: 'live'
    }
    // Amount by which to increment progress for each frame refresh
    this.delta = __FRAME_DURATION__ / this.props.duration 

    // bindings
    this.renderContent = this.renderContent.bind(this)
    this.timeout = this.timeout.bind(this)
    this.increment = this.increment.bind(this)
    this.die = this.die.bind(this)
  }

  componentDidMount() {
    this.timeout()
    this.interval = setInterval(this.increment, __FRAME_DURATION__)
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
    // this.setState({lifecycle: 'dead'})
    setTimeout(
      () => { this.setState({lifecycle: 'dead'}) }, 
      1000
    )
  }

  render() {
    var content;

    if (this.state.lifecycle != 'nan') {
      content = this.renderContent()
    }

    return (
        <CSSTransition
          timeout={500}
          classNames="fade"
          >
          <div>
            { content }
          </div>
        </CSSTransition>
      )
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
    
    var percentage = this.state.progress * 100

    return (
    	<div 
    		className='box2'
    		style={styles.container}
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

TimerRow.defaultProps = {
	duration: 5000,
	delay: 2000
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
	circle: {
		height: 250
	},
  whiteText: {
    color: 'white',
    textAlign: 'start'
  }
}