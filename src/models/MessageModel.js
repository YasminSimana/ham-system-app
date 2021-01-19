import { ExclamationTriangle, InfoCircle } from 'react-bootstrap-icons';
import Parse from 'parse';

class MessageModel {
    constructor(results){
        this.id = results.id;
        this.createdAt = results.get("createdAt");
        this.title = results.get("title");
        this.details = results.get("details");
        this.priority = results.get("priority");
        this.img = results.get("img").url();
    }

    getIcon() {
        if(this.priority === 1){
            return <InfoCircle/>
        } else if(this.priority === 2){
            return <ExclamationTriangle/>
        }
    }

    getPriorityName() {
        if(this.priority === 1){
            return "Information"
        } else if(this.priority === 2){
            return "Warning"
        }
    }

    async getComments() {
        const Comment = Parse.Object.extend('Comment');
        const query = new Parse.Query(Comment);
        // query.equalTo("msg", new Parse.Object("message"));
        // try{
        //     const results = await query.find();
        //     console.log('Comment found', results);
        //     return results;
        // } catch (error){
        //     console.error('Error while fetching Comment', error);
        // }
    }
}

export default MessageModel;