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
  
  module.exports = Message;
  