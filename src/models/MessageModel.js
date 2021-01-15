class MessageModel {
    constructor(results){
        this.id = results.id;
        this.title = results.get("title");
        this.details = results.get("details");
        this.priority = results.get("priority");
    }
}

export default MessageModel;