// src/js/actions/index.js

import { ADD_ARTICLE, ADD_TIMER } from "../constants/action-types";
export const addTimer = timer => ({ type: ADD_TIMER, payload: timer }); 
export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });