import { SWAPI_LISTING } from '../actions/apiEndpoint';
import middleware from './apiMiddleware';

export function getListingAPI(currentURL, searchText) {
  return new Promise((resolve, reject) => {
    console.warn(currentURL);
    
    const endpoint = currentURL ? `${`${currentURL.split("&")[0]}${searchText && `&search=${searchText}`}`}` : `${SWAPI_LISTING}?page=1${searchText && `&search=${searchText}`}`;
    middleware(endpoint, "GET", null, null)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}