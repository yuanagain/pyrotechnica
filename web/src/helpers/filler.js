// filler.js
// Yuan Wang

import store from '../js/store'
import { addTimer } from '../js/actions'

export const FillTimers = () => {
	__DUMMY_TIMERS__.map((item, index ) => {
		store.dispatch( addTimer(item) )
	})
}

export const __DUMMY_TIMERS__ = [
	{
		name: 'Timer 1', 
		duration: 7000,
		delay: 9000,
		latency: 10,
		fuse: 2000
	},
	{
		name: 'Timer 2',
		duration: 8000,
		delay: 4000,
		latency: 10,
		fuse: 2000
	},
	{
		name: 'Timer 3',
		duration: 3000,
		delay: 3000,
		latency: 10,
		fuse: 1000
	},
	{
		name: 'Timer 4',
		duration: 3000,
		delay: 12000,
		latency: 10,
		fuse: 1000
	},
]