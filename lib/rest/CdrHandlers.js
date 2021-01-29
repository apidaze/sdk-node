const { merge } = require('../utils/object');

/**
 * @classdesc Create a new call detail record handlers client
 * @constructs CdrHandlers
 * @memberof Apidaze
 * @param {Got} http - A got instance to manage HTTP requests
 *
 * @return {CdrHandlers}
 */
function CdrHandlers(http) {
  if (!http) {
    throw new Error("'http' must be provided.");
  }

  /**
   * @alias CdrHandlers#endpoint
   * @type string
   * @memberof CdrHandlers
   */
  this.endpoint = 'cdrhttphandlers';

  /**
   * Fetch the list of CDR handlers
   * @async
   * @alias CdrHandlers#list
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.list = async options => {
    return http.get(this.endpoint, options);
  };

  /**
   * Update a CDR handler with the given `id`
   * @async
   * @alias CdrHandlers#update
   * @param {string} id - The ID of the CDR handler to be updated
   * @param {Object} payload
   * @param {string} payload.url - The URL for the external script
   * @param {string} payload.name - The name for the external script
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.update = async (id, payload, options) => {
    const requestOptions = merge(
      {
        form: payload,
      },
      options
    );

    return http.put(`${this.endpoint}/${id}`, requestOptions);
  };

  /**
   * Create a CDR handler
   * @async
   * @alias CdrHandlers#create
   * @param {Object} payload
   * @param {string} payload.url - The URL for the external script
   * @param {string} payload.name - The name for the external script
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.create = async (payload, options) => {
    const requestOptions = merge(
      {
        form: payload,
      },
      options
    );

    return http.post(this.endpoint, requestOptions);
  };

  return this;
}

module.exports = CdrHandlers;
