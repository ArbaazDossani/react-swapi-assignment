import { SET_LISTING_DATA, RESET_LISTING_DATA, ADD_AJAX_CALL_COUNT, LESS_AJAX_CALL_COUNT, SET_SEARCH_TEXT } from '../actions/actionTypes';

import { getListingAPI } from '../services/listingService';

export function setListingData (payload, freshLoad) {
    return { type: SET_LISTING_DATA, payload, freshLoad };
}
export function resetListingData () {
    return { type: RESET_LISTING_DATA };
}
export function beginAjaxCall(payload) {
    return { type: ADD_AJAX_CALL_COUNT, payload };
} 
export function endAjaxCall(payload) {
    return { type: LESS_AJAX_CALL_COUNT, payload };
}
export function setSearchText(payload) {
    return { type: SET_SEARCH_TEXT, payload };
}

export function getListingData(freshLoad = true) {
  return (dispatch, getState) => {
        const {next, ajaxCallInProgress, searchText } = getState().listing;
        if (ajaxCallInProgress === 0) {
            dispatch(beginAjaxCall());
            getListingAPI(!freshLoad && next, searchText)
            .then((payload) => {
                dispatch(setListingData(payload, freshLoad));
                dispatch(endAjaxCall());
            })
            .catch((err) => {
                dispatch(endAjaxCall());
            });
        }
    }
}

export function setExpandedView(index) {
    return (dispatch, getState) => {
        const listing = JSON.parse(JSON.stringify(getState().listing));
        listing.results.forEach((card, i) => {
            card.isExpanded = !card.isExpanded && index === i;
        });
        dispatch(setListingData(listing, true));
    }
}

export function toggleFavourite(index) {
    return (dispatch, getState) => {
        const listing = JSON.parse(JSON.stringify(getState().listing));
        for (let i = 0; i<listing.results.length; i++) {
            if (i === index) {
                listing.results[i].isFavourite = !listing.results[i].isFavourite;
                break;
            }
        }
        dispatch(setListingData(listing, true));
    }
}