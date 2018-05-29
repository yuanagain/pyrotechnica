// src/components/TimerList.js
import React from "react";
import { connect } from "react-redux";
import TimerRow from './TimerRow.js'
import { __COMPONENT_STYLES__ } from '../global/Styles.js'

const mapStateToProps = state => {
  return { timers: state.timers };
};

// const ConnectedList = ({ timers }) => (
//   <ul className="list-group list-group-flush">
//     {articles.map(el => (
//       <li className="list-group-item" key={el.id}>
//         {el.name}
//       </li>
//     ))}
//   </ul>
// );

const ConnectedList = ({ timers }) => (
  <div>
    {timers.map((item, index) => (
    	<div 
    		style={styles.itemContainer}
    		key={index}>
    		<TimerRow {...item} />
	      
	    </div>
    ))}
  </div>
);

// <TimerRow {...item} key={index} />

const styles = {
	itemContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start'

	}
}

const TimerList = connect(mapStateToProps)(ConnectedList);

export default TimerList;