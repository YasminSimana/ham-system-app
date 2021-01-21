import React, { useEffect } from 'react';
import { useState } from 'react';
import { Accordion, Button, Card, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import './VotingsView.css';
import Parse from 'parse';
import CommentsModel from '../../models/CommentsModel';
import { BellFill } from 'react-bootstrap-icons';
import UpdateMessageModal from '../UpdateMessageModal/UpdateMessageModal';

function VotingsView(props) {
    const {isActive, votings, activeUser, updateVotingFromModal} = props;
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // useEffect(()=> {
    //     // async function fetchMessage() {
    //     //     debugger;
    //     //     const parseMessage = Parse.Object.extend('message');
    //     //     const query = new Parse.Query(parseMessage);
    //     //     console.log("selected message", messages[selectedMsg])
    //     //     const parseMessageData = await query.get(messages[selectedMsg].id);
    //     //     fetchCommentsData(parseMessageData);
    //     // }

    //     async function fetchCommentsData(msg) {
    //         const parseComment = Parse.Object.extend('Comment');
    //         const query = new Parse.Query(parseComment);
    //         query.equalTo("msg", messages[selectedMsg].parseMsg);
    //         const parseComments = await query.find();
    //         setCommentsArr(parseComments.map(item => new CommentsModel(item)));
    //         setLoading(false);
    //         console.log("comments arr", commentsArr);
    //     }
    //         if (selectedMsg !== null) {
    //             fetchCommentsData();
    //         }
    // }, [selectedMsg])


    // async function updateMessage(readBy){
    //     const message = Parse.Object.extend('message');
    //     const query = new Parse.Query(message);
    //     try {
    //         const object = await query.get(messages[selectedMsg].id);
    //         object.set('readBy', readBy);
    //         try{
    //             const response = await object.save();
    //             console.log('Updated message', response);
    //         }
    //         catch (error1) {
    //             console.error('Error while updating message', error1);
    //         }
    //     }
    //     catch (error2) {
    //         console.log('Error while updating message', error2)
    //     }
    // }

    // function msgOnClick(eventKey) {
    //     setLoading(true);
    //     setSelectedMsg(eventKey);

    //     if (wasReadByUser(eventKey)){
    //         console.log("was read", messages[eventKey].readBy)
    //         return;
    //     } else {
    //         console.log("wasn't read", messages[eventKey].readBy)
    //         messages[eventKey].readBy.push(activeUser.id)
    //         updateMessage(messages[eventKey].readBy);
    //     }
    // }

    // function wasReadByUser(eventKey) {
    //     if (messages[eventKey].readBy.includes(activeUser.id)){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }

    // async function addCommentToDB() {
    //     const message = Parse.Object.extend('message');
    //     const query = new Parse.Query(message);
    //     const Comment = Parse.Object.extend('Comment');
    //     const myNewObject = new Comment();
    //     const msgObject = await query.get(messages[selectedMsg].id);
    //     myNewObject.set('description', addComment);
    //     myNewObject.set('user', Parse.User.current());
    //     myNewObject.set('msg', msgObject);

    //     myNewObject.save().then(
    //     (result) => {
    //         console.log('Comment created', result);
    //         setCommentsArr(commentsArr.concat(new CommentsModel(result)));
    //         setLoading(false);
    //     },
    //     (error) => {
    //         console.error('Error while creating Comment: ', error);
    //     }
    //     );
    //     setAddComment("");
    // }

    // //convert data to presentation
    // const commentsView = commentsArr.map(comment => 
    //     <div key={comment.id}>
    //         <div>{comment.user.id}</div>
    //         <div>{comment.description}</div>
    //         {console.log("user", comment.user.id)}
    //     </div>)

    const votingsView = votings.map((voting, index) => {
        return <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={'' + index}>
            <div className="header-acc">
                <div>
                    {voting.title}
                </div>
                {/* <div>
                    {msg.getIcon()}
                </div> */}
            </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={'' + index}>
                
            <Card.Body>
                <div className="voting-comments-view">
                    <div>
                        <p>
                            Details: {voting.details}
                        </p>
                    </div>
                    <div className="end-date-section">
                    <p>
                            End Date: {voting.endDate.toLocaleDateString()}
                        </p>
                        {isActive ? <div className="voting-btm">
                        <Button onClick={() => setShowModal(true)}>Update End Date</Button>
                    </div> : null}
                    </div>
                    
                    
                </div>
            </Card.Body>
            </Accordion.Collapse>
            {/* <UpdateVotingModal show={showModal} handleClose={() => setShowModal(false)} updateMessage={updateMessageFromModal} id={msg.id} currentTitle={msg.title} currentDetails={msg.details} currentPriority={msg.priority} currentImg={msg.img}/> */}
        </Card>
    });

    return (
        <div className="c-voting-view">
            <Accordion defaultActiveKey="0">
                {votingsView}
            </Accordion>
        </div>
    );
}

export default VotingsView;