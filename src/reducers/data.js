/* @flow */
import { Map as IMap } from 'immutable';
import type { Action } from '../types/action';
import { SET_DATA } from '../actions/data';

const defaultState = IMap();

export default function general(state: Object = defaultState, action: Action) {
	switch (action.type) {
	case SET_DATA: {
		if (action.payload) {
			const { path, value } = action.payload;
			return state.setIn(path, value);
		}
		return state;
	}
	default:
		return state;
	}
}
