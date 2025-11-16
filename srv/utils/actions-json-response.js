class JsonResponse {
    /**
     * Constructor to initialize the JsonResponse object
     * @param {Object} data - The JSON data
     */
    constructor(messages, response, finished, successfully) {
      this.messages = messages || [];
      this.response = response || [];
      this.finished = finished || false;
      this.successfully = successfully || null;
    }
  
    /**
     * Get all messages
     * @returns {Array} List of messages
     */
    getMessages() {
      return this.messages;
    }
    addMessage(oMessage) {
      return this.messages.push(oMessage);
    }
  
    /**
     * Get all responses
     * @returns {Array} List of responses
     */
    getResponses() {
      return this.response;
    }
    setResponse(aResponse){
      return this.response = aResponse;
    }
    /**
     * Check if the execution is finished
     * @returns {Boolean} True if finished, otherwise false
     */
    isFinished() {
      return this.finished;
    }
  
    /**
     * Get the success status
     * @returns {Boolean|null} True if successful, false if not, or null if undefined
     */
    isSuccess() {
      return this.successfully;
    }
  
    /**
     * Find response by globalSettingId
     * @param {Number} id - The ID to search for
     * @returns {Object|null} The response object or null if not found
     */
    findResponseById(id) {
      return this.response.find((item) => item.globalSettingId === id) || null;
    }
  
    /**
     * Filter responses by status
     * @param {String} status - The status to filter by
     * @returns {Array} List of responses with the specified status
     */
    filterResponsesByStatus(status) {
      return this.response.filter((item) => item.globalSettingStatus === status);
    }
  
    /**
     * Convert the class instance to a JSON object
     * @returns {Object} JSON representation of the instance
     */
    toJSON() {
      return {
        messages: this.messages,
        response: this.response,
        finished: this.finished,
        successfully: this.successfully,
      };
    }
  }
  
  class Message {
    /**
     * Constructor to initialize the Message object
     * @param {string} type - The type of the message (e.g., "Information").
     * @param {string} title - The title of the message.
     * @param {string} description - The description of the message.
     * @param {string} subtitle - The subtitle of the message.
     * @param {string} group - The group the message belongs to.
     */
    constructor(type, title, description, subtitle, group) {
      this.type = type;
      this.title = title;
      this.description = description;
      this.subtitle = subtitle;
      this.group = group;
    }
  
    /**
     * Factory method to create a Message instance from a JSON object
     * @param {Object} json - The JSON object with message details.
     * @returns {Message} - A new instance of Message.
     */
    static fromJSON(json) {
      return new Message(
        json.type,
        json.title,
        json.description,
        json.subtitle,
        json.group
      );
    }
  
    /**
     * Convert the instance to a JSON object
     * @returns {Object} - JSON representation of the instance.
     */
    toJSON() {
      return {
        type: this.type,
        title: this.title,
        description: this.description,
        subtitle: this.subtitle,
        group: this.group,
      };
    }
  }
  
  module.exports = {JsonResponse, Message};
  
  