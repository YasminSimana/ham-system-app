import React, { useEffect } from 'react';
import { useState } from 'react';
import { Accordion, Button, Card, Form, FormControl, InputGroup } from 'react-bootstrap';
import './MessagesView.css';
import Parse from 'parse';
import CommentsModel from '../../models/CommentsModel';
import { BellFill, EnvelopeFill, EnvelopeOpen, PersonCircle } from 'react-bootstrap-icons';
import UpdateMessageModal from '../UpdateMessageModal/UpdateMessageModal';
import { Redirect } from 'react-router';

function MessagesView(props) {
    const {messages, activeUser, users, deleteMessage, updateMessageFromModal} = props;
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [commentsArr, setCommentsArr] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [addComment, setAddComment] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=> {

        async function fetchCommentsData(msg) {
            const parseComment = Parse.Object.extend('Comment');
            const query = new Parse.Query(parseComment);
            query.equalTo("msg", messages[selectedMsg].parseMsg);
            const parseComments = await query.find();
            setCommentsArr(parseComments.map(item => new CommentsModel(item)));
            setLoading(false);
            console.log("comments arr", commentsArr);
        }
            if (selectedMsg !== null) {
                fetchCommentsData();
            }
    }, [selectedMsg])

    if(!activeUser) {
        return <Redirect to="/" />
    }

    async function updateMessage(readBy, id){
        const message = Parse.Object.extend('message');
        const query = new Parse.Query(message);
        const object = await query.get(id);
        object.set('readBy', readBy);
        try{
            const response = await object.save();
            console.log('Updated message', response);
        }
        catch (error1) {
            console.error('Error while updating message', error1);
        }
    }

    function msgOnClick(eventKey) {
        setLoading(true);
        setSelectedMsg(eventKey);

        if (wasReadByUser(eventKey)){
            return;
        } else {
            messages[eventKey].readBy.push(activeUser.id)
            updateMessage(messages[eventKey].readBy, messages[eventKey].id);
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
    let commentsView;
    if (users) {
        commentsView = commentsArr.map(comment => {
            const user = users.find(user => user.id === comment.user.id);
            return <div className="comments-data" key={comment.id}>
                <div>{user.img ? <img src={user.img}></img> : <PersonCircle/>} {user.getFullName()}:</div>
                <div>{comment.description}</div>
            </div>}) 
    }
    
    const messagesView = messages.map((msg,index) => {
        return <Card key={messages.indexOf(msg)}>
            <Accordion.Toggle as={Card.Header} eventKey={'' + index}  onClick={e=>msgOnClick(index)}>
            <div className="header-acc">
                <div>
                    {wasReadByUser(index) ? null : <BellFill/>}
                    {msg.title}
                </div>
                <div>
                    {msg.getIcon()}
                </div>
            </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={'' + index}>
                
            <Card.Body>
                <div className="msg-comments-view">
                    <div className="msg-data">
                        {msg.img ? <img src={msg.img}></img> : <EnvelopeOpen></EnvelopeOpen> }
                        <p>
                            Details: {msg.details}
                        </p>
                        <p>
                            Priority: {msg.priority}
                        </p>
                    </div>
                    <div className="comments">
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
                            {activeUser.isCommitteeMember ?
                            <div className="msg-btm">
                                <Button onClick={() => setShowModal(true)}>Update</Button>
                                <Button onClick={ e=> deleteMessage(msg.id)}>Delete</Button>
                                </div> : null}
                        </div>
                    </div>
                </div>
            </Card.Body>
            </Accordion.Collapse>
        </Card>
    });

    return (
        <div className="c-msg-view">
            <Accordion defaultActiveKey={selectedMsg}>
                {messagesView}
            </Accordion>
            {(selectedMsg !== null && messages && selectedMsg < messages.length) ? <UpdateMessageModal
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                updateMessage={updateMessageFromModal} 
                id={messages[selectedMsg].id} 
                currentTitle={messages[selectedMsg].title} 
                currentDetails={messages[selectedMsg].details} 
                currentPriority={messages[selectedMsg].priority} 
                currentImg={messages[selectedMsg].img}/> : null}
        </div>
    );
}

export default MessagesView;