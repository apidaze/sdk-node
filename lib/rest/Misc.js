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
   * Validate the given API key and API secret
   * @async
   * @alias Misc#validate
   * @return {Promise<Response>}
   */
  this.validate = async () => {
    return http.get('validates');
  };

  return this;
}

module.exports = Misc;
