const { merge } = require('../utils/object');

/**
 * @classdesc Create a new recordings client
 * @constructs Recordings
 * @memberof Apidaze
 * @param {Got} http - A got instance to manage HTTP requests
 *
 * @return {Recordings}
 */
function Recordings(http) {
  if (!http) {
    throw new Error("'http' must be provided.");
  }

  /**
   * @async
   * @alias Recordings#endpoint
   * @type string
   * @memberof Recordings
   */
  this.endpoint = 'recordings';

  /**
   * Fetch the list of recordingsss
   * @async
   * @alias Recordings#list
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.list = async options => {
    return http.get(this.endpoint, options);
  };

  /**
   * Fetch a recording with the given `id`
   * @async
   * @alias Recordings#get
   * @param {string} fileName - The file name of the recording to be fetched
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.get = async (fileName, options) => {
    const requestOptions = merge(
      {
        responseType: 'buffer',
      },
      options
    );
    return http.get(`${this.endpoint}/${fileName}`, requestOptions);
  };

  /**
   * Delete a recording with the given `id`
   * @async
   * @alias Recordings#delete
   * @param {string} fileName - The file name of the recording to be deleted
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.delete = async (fileName, options) => {
    return http.delete(`${this.endpoint}/${fileName}`, options);
  };

  return this;
}

module.exports = Recordings;
