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
   * @return {Promise<Response>}
   */
  this.send = async (from, to, body) => {
    const payload = {
      from,
      to,
      body,
    };
    return await http.post(`${this.endpoint}/send`, { form: payload });
  };

  return this;
}

module.exports = Messages;
