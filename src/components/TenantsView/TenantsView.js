import React, { useEffect } from 'react';
import { useState } from 'react';
import { Accordion, Button, Card, Form, FormControl, InputGroup } from 'react-bootstrap';
import './TenantsView.css';
import Parse from 'parse';
import CommentsModel from '../../models/CommentsModel';
import { BellFill } from 'react-bootstrap-icons';
import UpdateTenantsModal from '../UpdateTenantsModal/UpdateTenantsModal';

function TenantsView(props) {
    const {tenants, activeUser, deleteTenant, updateTenantsInfoFromModal} = props;
    const [showModal, setShowModal] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState(null);

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


    // async function updateTenant(readBy){
    //     // const message = Parse.Object.extend('message');
    //     // const query = new Parse.Query(message);
    //     // try {
    //     //     const object = await query.get(messages[selectedMsg].id);
    //     //     object.set('readBy', readBy);
    //     //     try{
    //     //         const response = await object.save();
    //     //         console.log('Updated message', response);
    //     //     }
    //     //     catch (error1) {
    //     //         console.error('Error while updating message', error1);
    //     //     }
    //     // }
    //     // catch (error2) {
    //     //     console.log('Error while updating message', error2)
    //     // }
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

    //convert data to presentation
    // const commentsView = commentsArr.map(comment => 
    //     <div key={comment.id}>
    //         <div>{comment.user.id}</div>
    //         <div>{comment.description}</div>
    //         {console.log("user", comment.user.id)}
    //     </div>)

    const tenantsView = tenants.map((tenant, index) => {
        return <Card key={index}>
            {console.log("tenents", tenants)}
            {console.log("tenent[index]", tenants[index])}
            {console.log("selectedTenant", selectedTenant)}
            <Accordion.Toggle as={Card.Header} eventKey={'' + index} onClick={e=>setSelectedTenant(parseInt(index))}>
            <div className="header-acc">
                {tenant.fname} {tenant.lname}
            </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={'' + index}>
                
            <Card.Body>
                <div className="tenant-body">
                    <div>
                        <img src={tenant.img}></img>
                    </div>
                    <div className="tenant-info">
                        <p>Name: {tenant.fname} {tenant.lname}</p>
                        <p>Email: {tenant.email}</p>
                        <p>Building: {tenant.building}</p>
                        <p>Apt: {tenant.apartment}</p>
                    </div>
                    <div>
                        <div className="edit-btm">
                            <Button onClick={() => setShowModal(true)}>Update</Button>
                            <Button onClick={ e=> deleteTenant(tenant.id)}>Delete</Button>
                        </div>
                    </div>
                </div>
            </Card.Body>
            </Accordion.Collapse>
            {console.log("tenent[selectedTenant]", tenants[selectedTenant])}
            {(selectedTenant !== null) ? <UpdateTenantsModal
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                updateTenant={updateTenantsInfoFromModal} 
                id={tenants[selectedTenant].id} 
                currentFname={tenants[selectedTenant].fname} 
                currentLname={tenants[selectedTenant].lname} 
                currentEmail={tenants[selectedTenant].email}
                currentBuilding={tenants[selectedTenant].building}
                currentApartment={tenants[selectedTenant].apartment}
                currentImg={tenants[selectedTenant].img}/> : null}
        </Card>
    });
    console.log("tenants", tenants);
    return (
        <div className="c-tenant-view">
            <Accordion defaultActiveKey={selectedTenant}>
                {tenantsView}
            </Accordion>
        </div>
    );
}

export default TenantsView;