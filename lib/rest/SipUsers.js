/**
 * @classdesc Create a new SIP users client
 * @constructs SipUsers
 * @memberof Apidaze
 * @param {Got} http - A got instance to manage HTTP requests
 *
 * @return {SipUsers}
 */
function SipUsers(http) {
  if (!http) {
    throw new Error("'http' must be provided.");
  }

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
    return await http.post(this.endpoint, { form: payload });
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
    return await http.put(`${this.endpoint}/${id}`, { form: payload });
  };

  return this;
}

module.exports = SipUsers;
