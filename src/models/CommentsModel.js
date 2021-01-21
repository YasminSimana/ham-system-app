import UserModel from "./UserModel";

class CommentsModel {
    constructor(results){
        this.id = results.id;
        this.createdAt = results.get("createdAt");
        this.description = results.get("description");
        this.user = results.get("user");
        this.parseComment = results;
    }
}

export default CommentsModel;