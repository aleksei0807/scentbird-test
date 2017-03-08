/* @flow */
import type { Action } from '../types/action';

export const SET_DATA = 'SET_DATA';

export function setData(path: Array<string>, value: any) {
	return (dispatch: (action: Action) => Action) => {
		dispatch({
			type: SET_DATA,
			payload: {
				path,
				value,
			},
		});
	};
}
