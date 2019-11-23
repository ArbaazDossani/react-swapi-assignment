import axios from 'axios';
import isEmpty from 'lodash/isEmpty';


function checkForErrorMesg(response, ref) {
  const retObj = { error: false, errorMsg: '' };
  if (
    !(response.code >= 200 && response.code <= 299) &&
    !(ref.status >= 200 && ref.status <= 299)
  ) {
    // Allowing all 200 series as valid responses
    retObj.error = true;
    retObj.code = response.code;
    retObj.errorMsg = response.message;
  }

  return retObj;
}

function fetchTimeout(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ error: true, errorMsg: 'Sorry, request timed out.' });
    }, value);
  });
}

function middleware(endpoint, method, extraHeaders, payload) {
  return new Promise((resolve, reject) => {
    const allHeaders = {
      ...extraHeaders,
    };
    Promise.race(
      [fetchTimeout(30000),
      axios({
        headers: allHeaders,
        url: endpoint,
        data: payload,
        method,
        config: !isEmpty(payload) && { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
      })
      .then((response) => {
        const data = response.data;
        const errorObj = checkForErrorMesg(data, response);
        if (errorObj.error) {
          reject(errorObj);
        } else {
          resolve(data);
        }
      })
      .catch(err => reject(err))
    ]);
  });
}

export default middleware;
