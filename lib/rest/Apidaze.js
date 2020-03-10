const Http = require('./Http');
const Misc = require('./Misc');
const Calls = require('./Calls');
const Messages = require('./Messages');
const CdrHandlers = require('./CdrHandlers');
const ExternalScripts = require('./ExternalScripts');

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
  /**
   * A {@link Misc} instance
   * @alias Apidaze#misc
   * @type Misc
   */
  this.misc = new Misc(this.http);
  /**
   * A {@link Messages} instance
   * @alias Apidaze#messages
   * @type Messages
   */
  this.messages = new Messages(this.http);
  /**
   * An {@link ExternalScripts} instance
   * @alias Apidaze#externalScripts
   * @type ExternalScripts
   */
  this.externalScripts = new ExternalScripts(this.http);
  /**
   * A {@link Calls} instance
   * @alias Apidaze#calls
   * @type Calls
   */
  this.calls = new Calls(this.http);
  /**
   * A {@link CdrHandlers} instance
   * @alias Apidaze#cdrHandlers
   * @type CdrHandlers
   */
  this.cdrHandlers = new CdrHandlers(this.http);

  return this;
}

module.exports = Apidaze;
