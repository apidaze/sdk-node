const { merge } = require('../utils/object');

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
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.list = async options => {
    return await http.get(this.endpoint, options);
  };

  /**
   * Creates a SIP user
   * @async
   * @alias SipUsers#create
   * @param {Object} payload - The SIP account's data
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.create = async (payload, options) => {
    const requestOptions = merge(
      {
        json: payload,
      },
      options
    );

    return await http.post(this.endpoint, requestOptions);
  };

  /**
   * Deletes a SIP user
   * @async
   * @alias SipUsers#delete
   * @param {number} id - The SIP account's id
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.delete = async (id, options) => {
    return await http.delete(`${this.endpoint}/${id}`, options);
  };

  /**
   * Gets a SIP user
   * @async
   * @alias SipUsers#get
   * @param {number} id - The SIP account's id
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.get = async (id, options) => {
    return await http.get(`${this.endpoint}/${id}`, options);
  };

  /**
   * Updates a SIP user
   * @async
   * @alias SipUsers#update
   * @param {number} id - The SIP account's id
   * @param {Object} payload - The SIP account's data to update
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.update = async (id, payload, options) => {
    const requestOptions = merge(
      {
        json: payload,
      },
      options
    );

    return await http.put(`${this.endpoint}/${id}`, requestOptions);
  };

  /**
   * Get the status of a SIP user
   * @async
   * @alias SipUsers#getStatus
   * @param {number} id - The SIP account's id
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.getStatus = async (id, options) => {
    return await http.get(`${this.endpoint}/${id}/status`, options);
  };

  /**
   * Reset the password for a SIP user
   * @async
   * @alias SipUsers#resetPassword
   * @param {number} id - The SIP account's id
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.resetPassword = async (id, options) => {
    return await http.post(`${this.endpoint}/${id}/password`, options);
  };

  return this;
}

module.exports = SipUsers;
