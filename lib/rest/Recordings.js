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
   * @return {Promise<Response>}
   */
  this.list = async () => {
    return await http.get(this.endpoint);
  };

  /**
   * Fetch a recording with the given `id`
   * @async
   * @alias Recordings#get
   * @param {string} fileName - The file name of the recording to be fetched
   * @return {Promise<Response>}
   */
  this.get = async fileName => {
    return await http.get(`${this.endpoint}/${fileName}`, {
      responseType: 'buffer',
    });
  };

  /**
   * Delete a recording with the given `id`
   * @async
   * @alias Recordings#delete
   * @param {string} fileName - The file name of the recording to be deleted
   * @return {Promise<Response>}
   */
  this.delete = async fileName => {
    return await http.delete(`${this.endpoint}/${fileName}`);
  };

  return this;
}

module.exports = Recordings;
