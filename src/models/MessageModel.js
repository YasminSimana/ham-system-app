import { ExclamationTriangle, InfoCircle } from 'react-bootstrap-icons';

class MessageModel {
    constructor(results){
        this.id = results.id;
        this.createdAt = results.get("createdAt");
        this.title = results.get("title");
        this.details = results.get("details");
        // this.priority = results.get("priority");
        this.priority = results.get("priorityName");
        this.img = results.get("img") ? results.get("img").url() : null;
        this.readBy = results.get("readBy");
        this.parseMsg = results;
    }

    getIcon() {
        if(this.priority === "Info"){
            return <InfoCircle/>
        } else {
            return <ExclamationTriangle/>
        }
    }

    // getPriorityName() {
    //     if(this.priority === 1){
    //         return "Information"
    //     } else if(this.priority === 2){
    //         return "Warning"
    //     }
    // }
}

export default MessageModel;