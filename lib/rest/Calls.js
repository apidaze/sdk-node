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
    return await http.post(this.endpoint, { form: { callerid, ...rest } });
  };

  /**
   * Fetch the list of active calls
   * @async
   * @alias Calls#list
   * @return {Promise<Response>}
   */
  this.list = async () => {
    return await http.get(this.endpoint);
  };

  /**
   * Fetch an active call with the given `uuid`
   * @async
   * @alias Calls#get
   * @param {string} uuid - The UUID to be used to fetch the associated active call
   * @return {Promise<Response>}
   */
  this.get = async uuid => {
    return await http.get(`${this.endpoint}/${uuid}`);
  };

  /**
   * Terminate an active call with the given `uuid`
   * @async
   * @alias Calls#delete
   * @param {string} uuid - The UUID to be used to delete the associated active call
   * @return {Promise<Response>}
   */
  this.delete = async uuid => {
    return await http.delete(`${this.endpoint}/${uuid}`);
  };

  return this;
}

module.exports = Calls;
