import { SET_LISTING_DATA, RESET_LISTING_DATA, ADD_AJAX_CALL_COUNT, LESS_AJAX_CALL_COUNT, SET_SEARCH_TEXT } from '../actions/actionTypes';

const initialState = {
    count: 0,
    next: "", 
    previous: "", 
    results: [],
    ajaxCallInProgress: 0,
    searchText: ""
};

export default function listingReducer(state = initialState, action) {
    console.warn(action.payload);
    
    switch (action.type) {
      case SET_LISTING_DATA:
        if(action.freshLoad) {
            return {
                ...state,
                ...action.payload,
            }
        }
        return {
            ...state,
            results: [...state.results, ...action.payload.results],
            next: action.payload.next,
            previous: action.payload.previous,
            count: state.count + action.payload.count,
        }
        case RESET_LISTING_DATA:
            return {
                ...initialState
            }
        case ADD_AJAX_CALL_COUNT:
            return {
                ...state,
                ajaxCallInProgress: state.ajaxCallInProgress + 1,
            };
        case LESS_AJAX_CALL_COUNT:
            return {
                ...state,
                ajaxCallInProgress: state.ajaxCallInProgress > 0 ? state.ajaxCallInProgress - 1 : state.ajaxCallInProgress,
            };
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload
            }
        default:
           return state;

    }
}