/**
 * @classdesc Create a new applications client
 * @constructs Applications
 * @memberof Apidaze
 * @param {Got} http - A got instance to manage HTTP requests
 *
 * @return {Applications}
 */
function Applications(http) {
  if (!http) {
    throw new Error("'http' must be provided.");
  }

  /**
   * @alias Applications#endpoint
   * @type string
   * @memberof Applications
   */
  this.endpoint = 'applications';

  /**
   * Fetch the list of sub-applications
   * @async
   * @alias Applications#list
   * @return {Promise<Response>}
   */
  this.list = async () => {
    return http.get(this.endpoint);
  };

  /**
   * Fetch the list of sub-applications by the given `key` and `value`
   * @async
   * @alias Applications~getBy
   * @inner
   * @param {string} key - The condition `key`
   * @param {string} value - The condition `value`
   * @return {Promise<Response>}
   */
  const getBy = async (key, value) => {
    const searchParams = {
      [key]: value,
    };

    return http.get(this.endpoint, { searchParams });
  };

  /**
   * Fetch the list of sub-applications by the given API key
   * @async
   * @alias Applications#getByApiKey
   * @param {string} apiKey - The API key of applications to be fetched
   * @return {Promise<Response>}
   */
  this.getByApiKey = async apiKey => {
    return getBy('api_key', apiKey);
  };

  /**
   * Fetch the list of sub-applications by the given application name
   * @async
   * @alias Applications#getByName
   * @param {string} name - The name of applications to be fetched
   * @return {Promise<Response>}
   */
  this.getByName = async name => {
    return getBy('app_name', name);
  };

  /**
   * Fetch the list of sub-applications by the given application ID
   * @async
   * @alias Applications#getById
   * @param {number} id - The ID of applications to be fetched
   * @return {Promise<Response>}
   */
  this.getById = async id => {
    return getBy('app_id', id);
  };

  return this;
}

module.exports = Applications;
