// src/components/TimerList.js
import React from "react";
import { connect } from "react-redux";
import TimerRow from './TimerRow.js'

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
      <TimerRow {...item} key={index} />
    ))}
  </div>
);

const TimerList = connect(mapStateToProps)(ConnectedList);

export default TimerList;