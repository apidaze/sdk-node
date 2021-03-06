const Http = require('./Http');
const Misc = require('./Misc');
const Calls = require('./Calls');
const Messages = require('./Messages');
const SipUsers = require('./SipUsers');
const Recordings = require('./Recordings');
const CdrHandlers = require('./CdrHandlers');
const Applications = require('./Applications');
const MediaFiles = require('./MediaFiles');
const ExternalScripts = require('./ExternalScripts');

const API_URL = 'https://api.apidaze.io/';

/**
 * @classdesc Class representing an Apidaze client
 * @class Apidaze
 * @param {string} apiKey - The API key used for the authentication.
 * @param {string} apiSecret - The API secret used for the authentication.
 * @param {GotRequestOptions} options - Global Options
 * @param {string} [options.apiUrl] - The API URL used for the requests.
 * @param {string} [options.requestOptions] - The global request options to be used for HTTP requests
 *
 * @return {Apidaze}
 */
function Apidaze(apiKey, apiSecret, options = {}) {
  if (!apiKey || !apiSecret) {
    throw new Error("'apiKey' and 'apiSecret' must be provided.");
  }

  const { apiUrl = API_URL, requestOptions } = options;

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
  this.http = new Http(apiKey, apiSecret, apiUrl, requestOptions);
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
  /**
   * A {@link Recording} instance
   * @alias Apidaze#recordings
   * @type Recordings
   */
  this.recordings = new Recordings(this.http);
  /**
   * An {@link Applications} instance
   * @alias Apidaze#applications
   * @type Applications
   */
  this.applications = new Applications(this.http);
  /**
   * A {@link SipUsers} instance
   * @alias Apidaze#sipUsers
   * @type SipUsers
   */
  this.sipUsers = new SipUsers(this.http);
  /**
   * A {@link MediaFiles} instance
   * @alias Apidaze#mediaFiles
   * @type MediaFiles
   */
  this.mediaFiles = new MediaFiles(this.http);

  return this;
}

module.exports = Apidaze;
