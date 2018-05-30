import { 
  ADD_ARTICLE, 
  ADD_TIMER, 
  ELAPSE_TIME,
  UPDATE_DEVICES } from "../../constants/action-types";

const initialState = {
  articles: [],
  timers: [],
  time: 0,
  devices: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
		// Using concat(), slice(), and …spread for arrays
		// Using Object.assign() and …spread for objects
      return { ...state, articles: [...state.articles, action.payload] };

    case ADD_TIMER:
      return { ...state, timers: [...state.timers, action.payload] };

    case ELAPSE_TIME:
      return {...state, time: state.time + action.dt }

    case UPDATE_DEVICES:
      return {...state, devices: action.devices}

    default:
      return state;
  }
};
export default rootReducer;