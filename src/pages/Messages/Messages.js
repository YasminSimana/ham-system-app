import React, { useEffect, useState } from 'react';
import { AppNavbar } from '../../components/Navbar/Navbar';
import Parse from 'parse';
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import MessageModel from '../../models/MessageModel';
import './Messages.css';
import MessagesView from '../../components/MessagesView/MessagesView';
import NewMessageModal from '../../components/NewMessageModal/NewMessageModal';

function Messages(props) {
    const {activeUser, onLogOut} = props;
    const [searchByStr, setSearchByStr] = useState("");
    const [messagesArr, setMessagesArr] = useState([]);
    const [filterByPriority, setFilterByPriority] = useState(null);
    const [sortBy, setSortBy] = useState("createdAt");
    const [showModal, setShowModal] = useState(false);

    useEffect(()=> {
        async function fetchData() {
            const parseMessage = Parse.Object.extend('message');
            const query = new Parse.Query(parseMessage);
            const parseMessages = await query.find();
            setMessagesArr(parseMessages.map(item => new MessageModel(item)));
        }

        if (activeUser) {
            fetchData()
        }
    }, [activeUser])


    async function addMessage(title, details, priority, img) {
        const message = Parse.Object.extend('message');
        const newMessage = new message();
        
        newMessage.set('title', title);
        newMessage.set('details', details);
        newMessage.set('priority', parseInt(priority));
        newMessage.set('img', new Parse.File(img.name, img));
        newMessage.set('createdBy', Parse.User.current());
        
        const parseMessage = await newMessage.save();
        setMessagesArr(messagesArr.concat(new MessageModel(parseMessage)));
    }

    function deleteMessage(id,index) {
        console.log("delete id", id)
        console.log("delete index", index)
        // const Comment = Parse.Object.extend('Comment');
        // const query = new Parse.Query(Comment);
        // // here you put the objectId that you want to delete
        // query.get(id).then((object) => {
        // object.destroy().then((response) => {
        //     console.log('Deleted Comment', response);
        //     setMessagesArr(messagesArr.splice(index, 1));
        // }, (error) => {
        //     console.error('Error while deleting Comment', error);
        // });
        // });
    }


    //convert data to presentation
    const filteredMsg = messagesArr.filter(msg => (msg.title.includes(searchByStr) || msg.details.includes(searchByStr)) && (filterByPriority ? msg.priority === parseInt(filterByPriority) : true));

    filteredMsg.sort((msg1, msg2) => {
        if(msg1[sortBy] > msg2[sortBy]){
            return 1;
        } else if (msg1[sortBy] < msg2[sortBy]){
            return -1;
        } else {
            return 0;
        }
    })
        
    return (
        <div className="p-messages">
            <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/>
            <div className="filters">
                <Container>
                    <Row>
                        <Col lg={6} md={12}>
                            <Form>
                                <Form.Group controlId="formBasicSearch">
                                <Form.Control value={searchByStr} type="text" placeholder="Filter by text in Title and Details" onChange={e => setSearchByStr(e.target.value)}/>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={3} md={3}>
                            <DropdownButton value={filterByPriority} id="dropdown-basic-button" title={"Filter by Priority: " + filterByPriority} onSelect={e => setFilterByPriority(e)}>
                                <Dropdown.Item eventKey="1" href="#">Information</Dropdown.Item>
                                <Dropdown.Item eventKey="2" href="#">Warning</Dropdown.Item>
                                <Dropdown.Item eventKey="3" href="#">Other</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col lg={3} md={3}>
                            <Form>
                                <fieldset>
                                    <Form.Group value={sortBy} as={Row} onChange={e => setSortBy(e.target.value)}>
                                        <Form.Label column as="legend" lg={5}>Sort By:</Form.Label>
                                        <Form.Check value="createdAt" type="radio" label="Date" name="formHorizontalRadios" id="formHorizontalRadios1" className="sort-by"/>
                                        <Form.Check value="priority" type="radio" label="Priority" name="formHorizontalRadios" id="formHorizontalRadios2" className="sort-by"/>
                                    </Form.Group>
                                </fieldset>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col mr="auto">
                            <Button variant="link" onClick={() => setShowModal(true)}>New Message</Button>
                        </Col>
                    </Row>
                </Container>
                
            </div>
            <div className="new-msg-btn">
                
            </div>
            <Container>
                <MessagesView messages={filteredMsg} deleteMessage={deleteMessage}/>
            </Container>
            <NewMessageModal show={showModal} handleClose={() => setShowModal(false)} addMessage={addMessage}/>
        </div>
    );
}

export default Messages;