/**
 * @classdesc Create a new SIP users client
 * @constructs SipUsers
 * @memberof Apidaze
 * @param {Got} baseHttpClient - A got instance to manage HTTP requests
 *
 * @return {SipUsers}
 */
function SipUsers(baseHttpClient) {
  if (!baseHttpClient) {
    throw new Error("'baseHttpClient' must be provided.");
  }

  const http = baseHttpClient.extend({
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * @async
   * @alias SipUsers#endpoint
   * @type string
   * @memberof SipUsers
   */
  this.endpoint = 'sipusers';

  /**
   * Gets SIP users
   * @async
   * @alias SipUsers#list
   * @return {Promise<Response>}
   */
  this.list = async () => {
    return await http.get(this.endpoint);
  };

  /**
   * Creates a SIP user
   * @async
   * @alias SipUsers#create
   * @param {Object} payload - The SIP account's data
   * @return {Promise<Response>}
   */
  this.create = async payload => {
    return await http.post(this.endpoint, { json: payload });
  };

  /**
   * Deletes a SIP user
   * @async
   * @alias SipUsers#delete
   * @param {number} id - The SIP account's id
   * @return {Promise<Response>}
   */
  this.delete = async id => {
    return await http.delete(`${this.endpoint}/${id}`);
  };

  /**
   * Gets a SIP user
   * @async
   * @alias SipUsers#get
   * @param {number} id - The SIP account's id
   * @return {Promise<Response>}
   */
  this.get = async id => {
    return await http.get(`${this.endpoint}/${id}`);
  };

  /**
   * Updates a SIP user
   * @async
   * @alias SipUsers#update
   * @param {number} id - The SIP account's id
   * @param {Object} payload - The SIP account's data to update
   * @return {Promise<Response>}
   */
  this.update = async (id, payload) => {
    return await http.put(`${this.endpoint}/${id}`, { json: payload });
  };

  /**
   * Get the status of a SIP user
   * @async
   * @alias SipUsers#getStatus
   * @param {number} id - The SIP account's id
   * @return {Promise<Response>}
   */
  this.getStatus = async id => {
    return await http.get(`${this.endpoint}/${id}/status`);
  };

  /**
   * Reset the password for a SIP user
   * @async
   * @alias SipUsers#resetPassword
   * @param {number} id - The SIP account's id
   * @return {Promise<Response>}
   */
  this.resetPassword = async id => {
    return await http.post(`${this.endpoint}/${id}/password`);
  };

  return this;
}

module.exports = SipUsers;
