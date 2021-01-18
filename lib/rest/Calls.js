const { merge } = require('../utils/object');

/**
 * @classdesc Create a new calls client
 * @constructs Calls
 * @memberof Apidaze
 * @param {Got} http - A got instance to manage HTTP requests
 *
 * @return {Calls}
 */
function Calls(http) {
  if (!http) {
    throw new Error("'http' must be provided.");
  }

  /**
   * @alias Calls#endpoint
   * @type string
   * @memberof Calls
   */
  this.endpoint = 'calls';

  /**
   * Place a call
   * @async
   * @alias Calls#validate
   * @param {Object} payload
   * @param {string} payload.callerId - The phone number to present as the callerid (country code included, no + sign)
   * @param {string} payload.origin - The phone number or SIP account to ring first
   * @param {string} payload.destination - The destination passed as a parameter to your External Script URL
   * @param {string} payload.type - The type of the terminal to ring first. Options: "number" or "sipaccount"
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.make = async ({ callerId: callerid, ...rest }, options) => {
    const payload = { callerid, ...rest };

    const requestOptions = merge(
      {
        form: payload,
      },
      options
    );

    return http.post(this.endpoint, requestOptions);
  };

  /**
   * Fetch the list of active calls
   * @async
   * @alias Calls#list
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.list = async options => {
    return http.get(this.endpoint, options);
  };

  /**
   * Fetch an active call with the given `uuid`
   * @async
   * @alias Calls#get
   * @param {string} uuid - The UUID to be used to fetch the associated active call
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.get = async (uuid, options) => {
    return http.get(`${this.endpoint}/${uuid}`, options);
  };

  /**
   * Terminate an active call with the given `uuid`
   * @async
   * @alias Calls#delete
   * @param {string} uuid - The UUID to be used to delete the associated active call
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.delete = async (uuid, options) => {
    return http.delete(`${this.endpoint}/${uuid}`, options);
  };

  /**
   * Transfer a Call back to request an external script. Any additional properties in the request will be added or updated in the call's variables before attempting the transfer.
   * @async
   * @alias Calls#transfer
   * @param {string} uuid - The UUID to be used to transfer the associated active call
   * @param {Object} [payload] - Any additional properties for the dial plan
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.transfer = async (uuid, payload = {}, options) => {
    const requestOptions = merge(
      {
        form: payload,
      },
      options
    );

    return http.post(`${this.endpoint}/${uuid}/transfer`, requestOptions);
  };

  /**
   * Can be used to live-monitor a call or intercept and bridge it to another call. Any additional properties in the request will be added or updated in the call's variables before attempting the transfer.
   * @async
   * @alias Calls#intercept
   * @param {string} uuid - The UUID to be used to intercept the associated active call
   * @param {Object} [payload] - Any additional properties for the dial plan
   * @param {string} [payload.interceptUuid] - Call to be intercepted
   * @param {Boolean} [payload.liveMonitor] - Set to true if you would like to intercept for a live monitor
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.intercept = async (uuid, payload = {}, options) => {
    const payloadMap = {
      interceptUuid: 'intercept_uuid',
      liveMonitor: 'live_monitor',
    };

    const data = Object.entries(payload).reduce((params, entry) => {
      const [key, value] = entry;

      const newKey = payloadMap[key] || key;

      return {
        ...params,
        [newKey]: value,
      };
    }, {});

    const requestOptions = merge(
      {
        form: data,
      },
      options
    );

    return http.post(`${this.endpoint}/${uuid}/intercept`, requestOptions);
  };

  return this;
}

module.exports = Calls;
