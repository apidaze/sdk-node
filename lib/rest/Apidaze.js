const Http = require('./Http');

const API_URL = 'https://api.apidaze.io/';

/**
 * @classdesc Class representing an Apidaze client
 * @class Apidaze
 * @param {string} apiKey - The API key used for the authentication.
 * @param {string} apiSecret - The API secret used for the authentication.
 * @param {string} [apiUrl] - The API URL used for the requests.
 *
 * @return {Apidaze}
 */
function Apidaze(apiKey, apiSecret, apiUrl = API_URL) {
  if (!apiKey || !apiSecret) {
    throw new Error("'apiKey' and 'apiSecret' must be provided.");
  }

  /**
   * The API key
   * @alias Apidaze#apiKey
   * @type string
   */
  this.apiKey = apiKey;
  /**
   * The API secret
   * @alias Apidaze#apiSecret
   * @type string
   */
  this.apiSecret = apiSecret;
  /**
   * The API url
   * @alias Apidaze#apiUrl
   * @type string
   */
  this.apiUrl = apiUrl;

  /**
   * The {@link Http} instance for network requests
   * @alias Apidaze#http
   * @type Got
   */
  this.http = new Http(apiKey, apiSecret, apiUrl);

  return this;
}

module.exports = Apidaze;