const { URL } = require('url');
const got = require('got');

/**
 * The response body returned from HTTP requests
 *
 * @typedef {Object} Response
 * @property {string|Object|Array} body
 * @property {number} statusCode
 */

/**
 * Github: {@link https://github.com/sindresorhus/got}
 * @typedef Got
 */

/**
 * @classdesc Create a new HTTP client
 * @constructs Http
 * @memberof Apidaze
 * @param {string} apiKey - The API key used for the authentication.
 * @param {string} apiSecret - The API secret used for the authentication.
 * @param {string} apiUrl - The API URL used for the requests.
 *
 * @return {Got}
 */
function Http(apiKey, apiSecret, apiUrl) {
  const baseUrl = new URL(apiKey, apiUrl);

  // defaults
  const client = got.extend({
    prefixUrl: baseUrl.href,
    retry: 0,
    responseType: 'json',
    searchParams: {
      api_secret: apiSecret,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    hooks: {
      afterResponse: [
        function responseTrimmer(response) {
          return {
            body: response.body,
            statusCode: response.statusCode,
          };
        },
      ],
    },
  });

  return client;
}

module.exports = Http;
