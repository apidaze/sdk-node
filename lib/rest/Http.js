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
 * The request options from `got`. More information can be found [here]{@link https://github.com/sindresorhus/got#api}.
 *
 * @typedef {Object} GotRequestOptions
 */

/**
 * @classdesc Create a new HTTP client
 * @constructs Http
 * @memberof Apidaze
 * @param {string} apiKey - The API key used for the authentication.
 * @param {string} apiSecret - The API secret used for the authentication.
 * @param {string} apiUrl - The API URL used for the requests.
 * @param {GotRequestOptions} options - The options
 *
 * @return {Got}
 */
function Http(apiKey, apiSecret, apiUrl, options = {}) {
  const baseUrl = new URL(apiKey, apiUrl);

  // defaults
  const defaultOptions = {
    prefixUrl: baseUrl.href,
    retry: 0,
    responseType: 'json',
    allowGetBody: true,
    searchParams: {
      api_secret: apiSecret,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    hooks: {
      afterResponse: [
        function responseTrimmer(response) {
          const headers = response.headers;
          const headerWhiteList = [
            'list-truncation-token',
            'content-type',
            'content-length',
          ];
          const whiteHeaders = headerWhiteList.reduce((result, headerKey) => {
            const headerValue = headers[headerKey];

            if (headerValue) {
              return {
                ...result,
                [headerKey]: headerValue,
              };
            }

            return result;
          }, {});

          const customResponse = {
            body: response.body,
            statusCode: response.statusCode,
          };

          const hasWhiteHeaders = Object.values(whiteHeaders).length;

          if (hasWhiteHeaders) {
            return {
              ...customResponse,
              headers: whiteHeaders,
            };
          }

          return customResponse;
        },
      ],
    },
  };

  const extendedOptions = got.mergeOptions(defaultOptions, options);
  const client = got.extend(extendedOptions);

  return client;
}

module.exports = Http;
