/**
 * @classdesc Create a new external scripts client
 * @constructs ExternalScripts
 * @memberof Apidaze
 * @param {Got} http - A got instance to manage HTTP requests
 *
 * @return {ExternalScripts}
 */
module.exports = function ExternalScripts(http) {
  if (!http) {
    throw new Error("'http' must be provided.");
  }

  /**
   * @alias ExternalScripts#endpoint
   * @type string
   * @memberof ExternalScripts
   */
  this.endpoint = 'externalscripts';

  /**
   * Fetch an external script with the given `id`
   * @async
   * @alias ExternalScripts#get
   * @param {string} id - The ID of the external script to be used
   * @return {Promise<Response>} HTTP response
   */
  this.get = async id => {
    return http.get(`${this.endpoint}/${id}`);
  };

  /**
   * Fetch the list of external scripts
   * @async
   * @alias ExternalScripts#list
   * @return {Promise<Response>} HTTP response
   */
  this.list = async () => {
    return http.get(this.endpoint);
  };

  /**
   * Update an external script of the given `id` with the given `payload`
   * @async
   * @alias ExternalScripts#update
   * @param {string} id - The ID of the external script to be updated
   * @param {Object} payload
   * @param {string} payload.url - The new URL for the external script
   * @param {string} payload.name - The new name for the external script
   * @return {Promise<Response>} HTTP response
   */
  this.update = async (id, payload) => {
    return http.put(`${this.endpoint}/${id}`, { form: payload });
  };

  return this;
};
