/**
 * @classdesc Create a new miscellaneous client
 * @constructs Misc
 * @memberof Apidaze
 * @param {Got} http - A got instance to manage HTTP requests
 *
 * @return {Misc}
 */
function Misc(http) {
  if (!http) {
    throw new Error("'http' must be provided.");
  }

  /**
   * Validates the given API key and API secret
   * @async
   * @alias Misc#validate
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.validate = async options => {
    return http.get('validates', options);
  };

  return this;
}

module.exports = Misc;
