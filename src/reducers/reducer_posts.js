import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
	switch (action.type) {
	case DELETE_POST:
		return _.omit(state, action.payload);
	case FETCH_POSTS:
		return _.mapKeys(action.payload.data, 'id');
	case FETCH_POST:
		// get all objects from state 
		// const post = action.payload.data;
		// commented out ES% way to do it
		//const newState = { ...state,  };
		//newState[post.id] = post;
		//return newState;

		// [] means keys interpolation, make new key on object using id 
		// and set value to action.payload.data
		return { ...state, [action.payload.data.id]: action.payload.data };
	default: 
		return state;
	}
}