import React, { useEffect } from 'react';
import { useState } from 'react';
import { Accordion, Button, Card, Form, FormControl, InputGroup } from 'react-bootstrap';
import './MessagesView.css';
import Parse from 'parse';
import CommentsModel from '../../models/CommentsModel';
import { BellFill } from 'react-bootstrap-icons';
import UpdateMessageModal from '../UpdateMessageModal/UpdateMessageModal';

function MessagesView(props) {
    const {messages, activeUser, deleteMessage, updateMessageFromModal} = props;
    const [selectedMsg, setSelectedMsg] = useState(0);
    const [commentsArr, setCommentsArr] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [addComment, setAddComment] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function fetchMessage() {
            const parseMessage = Parse.Object.extend('message');
            const query = new Parse.Query(parseMessage);
            console.log("msg 1", messages[selectedMsg])
            const parseMessageData = await query.get(messages[selectedMsg].id);
            fetchCommentsData(parseMessageData);
        }

        async function fetchCommentsData(msg) {
            console.log("msg", msg)
            const parseComment = Parse.Object.extend('Comment');
            const query = new Parse.Query(parseComment);
            // const message = new Parse.Object.extend('message');
            // message.id = messages[selectedMsg].id;
            query.equalTo("msg", msg);
            const parseComments = await query.find();
            setCommentsArr(parseComments.map(item => new CommentsModel(item)));
            setLoading(false);
            console.log("fetch", commentsArr);
        }
            if (selectedMsg) {
                fetchMessage();
            }
    }, [selectedMsg])


    async function updateMessage(readBy){
        const message = Parse.Object.extend('message');
        const query = new Parse.Query(message);
        try {
            const object = await query.get(messages[selectedMsg].id);
            object.set('readBy', readBy);
            try{
                const response = await object.save();
                console.log('Updated message', response);
            }
            catch (error1) {
                console.error('Error while updating message', error1);
            }
        }
        catch (error2) {
            console.log('Error while updating message', error2)
        }
    }

    function msgOnClick(eventKey) {
        setLoading(true);
        setSelectedMsg(eventKey);

        if (wasReadByUser(eventKey)){
            console.log("mism2", messages[eventKey].readBy)
            return;
        } else {
            console.log("mism", messages[eventKey].readBy)
            messages[eventKey].readBy.push(activeUser.id)
            updateMessage(messages[eventKey].readBy);
        }
    }

    function wasReadByUser(eventKey) {
        if (messages[eventKey].readBy.includes(activeUser.id)){
            return true;
        }
        else{
            return false;
        }
    }

    async function addCommentToDB() {
        // setLoading(true);
        const message = Parse.Object.extend('message');
        const query = new Parse.Query(message);
        const Comment = Parse.Object.extend('Comment');
        const myNewObject = new Comment();
        const msgObject = await query.get(messages[selectedMsg].id);
        myNewObject.set('description', addComment);
        myNewObject.set('user', Parse.User.current());
        myNewObject.set('msg', msgObject);

        myNewObject.save().then(
        (result) => {
            console.log('Comment created', result);
            setCommentsArr(commentsArr.concat(new CommentsModel(result)));
            setLoading(false);
        },
        (error) => {
            console.error('Error while creating Comment: ', error);
        }
        );
        setAddComment("");
    }

    //convert data to presentation
    const commentsView = commentsArr.map(comment => 
        <div key={comment.id}>
            <div>{comment.user.id}</div>
            <div>{comment.description}</div>
            {console.log("user", comment.user.id)}
        </div>)

    const messagesView = messages.map(msg => {
        return <Card key={messages.indexOf(msg)}>
            <Accordion.Toggle as={Card.Header} eventKey={'' + messages.indexOf(msg)}  onClick={e=>msgOnClick(messages.indexOf(msg))}>
            <div className="header-acc">
                <div>
                    {wasReadByUser(messages.indexOf(msg)) ? null : <BellFill/>}
                    {msg.title}
                </div>
                <div>
                    {msg.getIcon()}
                </div>
            </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={'' + messages.indexOf(msg)}>
                
            <Card.Body>
                <div className="msg-comments-view">
                    <div>
                        <img src={msg.img}></img>
                        <p>
                            Details: {msg.details}
                        </p>
                        <p>
                            Priority: {msg.getPriorityName()}
                        </p>
                    </div>
                    <div>
                        <p>
                            Comments:
                        </p>
                        <div>
                            {loading ? "loading..." : commentsView}
                        </div>
                        <div>
                            <div className="msg-btm">
                            <InputGroup className="mb-3">
                                <FormControl
                                value={addComment}
                                onChange={e => setAddComment(e.target.value)}
                                type="text"
                                placeholder="Add comment"
                                />
                                <InputGroup.Append>
                                <Button onClick={addCommentToDB} variant="outline-secondary">Add</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            </div>
                            
                            <div className="msg-btm">
                                <Button onClick={() => setShowModal(true)}>Update</Button>
                                <Button onClick={ e=> deleteMessage(msg.id, messages.indexOf(msg))}>Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
            </Accordion.Collapse>
            <UpdateMessageModal show={showModal} handleClose={() => setShowModal(false)} updateMessage={updateMessageFromModal} id={msg.id} currentTitle={msg.title} currentDetails={msg.details} currentPriority={msg.priority} currentImg={msg.img}/>
        </Card>
    });

    return (
        <div className="c-msg-view">
            <Accordion defaultActiveKey={selectedMsg}>
                {messagesView}
            </Accordion>
        </div>
    );
}

export default MessagesView;