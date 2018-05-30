// src/js/actions/index.js

import { 
	ADD_ARTICLE, 
	ADD_TIMER,
	ELAPSE_TIME,
	UPDATE_DEVICES } from "../../constants/action-types";
export const addTimer = timer => ({ type: ADD_TIMER, payload: timer }); 
export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });
export const elapseTime = dt => ({ type: ELAPSE_TIME, dt: dt})
export const updateDevices = devices => ({ type: UPDATE_DEVICES, devices: devices})