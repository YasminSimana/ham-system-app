class MessageModel {
    constructor(results){
        this.id = results.id;
        this.createdAt = results.get("createdAt");
        this.title = results.get("title");
        this.details = results.get("details");
        this.priority = results.get("priority");
    }
}

export default MessageModel;