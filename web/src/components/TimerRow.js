// TimerRow.js
// Yuan Wang

import React, {Component } from 'react';
import { White, PrimaryColor } from '../global/Colors.js'
import { Line, Circle } from 'rc-progress';
import { Progress } from 'antd';
import CircularProgressbar from 'react-circular-progressbar';
 
const __FRAME_DURATION__ = 20 // => 50 FPS

export default class TimerRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      live: 0,
      progress: 0.0
    }
    // Amount by which to increment progress for each frame refresh
    this.delta = __FRAME_DURATION__ / this.props.duration * Math.random()

    // bindings
    this.timeout = this.timeout.bind(this)
    this.increment = this.increment.bind(this)
  }

  componentDidMount() {
    this.timeout()
    this.interval = setInterval(this.increment, __FRAME_DURATION__)
  }

  increment() {
  	if (this.state.progress < 1) {
	  	this.setState({progress:  this.state.progress + this.delta})
	  }
	  else {
	  	clearInterval(this.interval)
	  }
  }

  // after no response, becomes timeout
  timeout() {

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

    var options = {
    	strokeWidth: 2
    };

    // For demo purposes so the container has some dimensions.
    // Otherwise progress bar won't be shown
    var containerStyle = {
      width: '200px',
      height: '200px'
    };
 

    return (
    	<div 
    		className='box2'
    		style={styles.container}
    		>

    		<div style={styles.timerContainer}>
          <CircularProgressbar percentage={60} />
	    		<Progress 
	    			showInfo={true}
	    			type="circle" 
            width={180}
            style={{
              color: White(1),
              alignItems: 'center',
              justifyContent: 'center'
            }}
            gapPosition={'bottom'}
	    			format={percent => `${ Math.round( (1 - percent / 100) * this.props.duration / 10) / 100 } s`}
	    			percent={this.state.progress * 100} 
            status="exception" />
	      </div>
        <div style={styles.pane}>
		      <h4 
		        style={{
		          ...styles.whiteText,
		          ...{
		            color: highlight
		          }
		        }}>
		        {"TIMER ROW"}
		      </h4>
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
		borderRadius: 4,
		padding: 10,
		margin: 20,
		height: 200,
	},
	timerContainer: {
		display: 'flex',
		flex: 0,
    padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pane: {
		display: 'flex',
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