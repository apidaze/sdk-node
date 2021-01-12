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
   * @return {Promise<Response>}
   */
  this.make = async ({ callerId: callerid, ...rest }) => {
    return http.post(this.endpoint, { form: { callerid, ...rest } });
  };

  /**
   * Fetch the list of active calls
   * @async
   * @alias Calls#list
   * @return {Promise<Response>}
   */
  this.list = async () => {
    return http.get(this.endpoint);
  };

  /**
   * Fetch an active call with the given `uuid`
   * @async
   * @alias Calls#get
   * @param {string} uuid - The UUID to be used to fetch the associated active call
   * @return {Promise<Response>}
   */
  this.get = async uuid => {
    return http.get(`${this.endpoint}/${uuid}`);
  };

  /**
   * Terminate an active call with the given `uuid`
   * @async
   * @alias Calls#delete
   * @param {string} uuid - The UUID to be used to delete the associated active call
   * @return {Promise<Response>}
   */
  this.delete = async uuid => {
    return http.delete(`${this.endpoint}/${uuid}`);
  };

  /**
   * Transfer a Call back to request an external script. Any additional properties in the request will be added or updated in the call's variables before attempting the transfer.
   * @async
   * @alias Calls#transfer
   * @param {string} uuid - The UUID to be used to transfer the associated active call
   * @param {Object} [payload] - Any additional properties for the dial plan
   * @return {Promise<Response>}
   */
  this.transfer = async (uuid, payload = {}) => {
    return http.post(`${this.endpoint}/${uuid}/transfer`, { form: payload });
  };

  /**
   * Can be used to live-monitor a call or intercept and bridge it to another call. Any additional properties in the request will be added or updated in the call's variables before attempting the transfer.
   * @async
   * @alias Calls#intercept
   * @param {string} uuid - The UUID to be used to intercept the associated active call
   * @param {Object} [payload] - Any additional properties for the dial plan
   * @param {string} [payload.interceptUuid] - Call to be intercepted
   * @param {Boolean} [payload.liveMonitor] - Set to true if you would like to intercept for a live monitor
   * @return {Promise<Response>}
   */
  this.intercept = async (uuid, payload = {}) => {
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

    return http.post(`${this.endpoint}/${uuid}/intercept`, { form: data });
  };

  return this;
}

module.exports = Calls;
