const { merge } = require('../utils/object');

/**
 * @classdesc Messages client
 * @constructs Messages
 * @memberof Apidaze
 * @param {Got} http - A got instance to manage HTTP requests
 *
 * @return {Messages}
 */
function Messages(http) {
  if (!http) {
    throw new Error("'http' must be provided.");
  }

  /**
   * @alias Messages#endpoint
   * @type string
   * @memberof Messages
   */
  this.endpoint = 'sms';

  /**
   * Sends an SMS according to the given payload
   * @async
   * @param {string} from - The sender
   * @param {string} to - The receiver
   * @param {string} body - The message
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.send = async (from, to, body, options = {}) => {
    const payload = {
      from,
      to,
      body,
    };

    const requestOptions = merge(
      {
        form: payload,
      },
      options
    );

    return http.post(`${this.endpoint}/send`, requestOptions);
  };

  return this;
}

module.exports = Messages;
