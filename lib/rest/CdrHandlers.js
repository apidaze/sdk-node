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
   * @return {Promise<Response>}
   */
  this.list = async () => {
    return await http.get(this.endpoint);
  };

  return this;
}

module.exports = CdrHandlers;
