import React, { useState } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import './Messages.css';
import MessagesView from '../../components/MessagesView/MessagesView';
import NewMessageModal from '../../components/NewMessageModal/NewMessageModal';
import { Redirect } from 'react-router';

//Messages component is the page were user see all relevant messages, sort and filter them
//Committee member can add a new message, update message details and delete message
//All user can also add comments to each message
function Messages(props) {
    const {activeUser, users, messages, addMessage, updateMessage, deleteMessage, onLogOut} = props;
    const [searchByStr, setSearchByStr] = useState("");
    const [filterByPriority, setFilterByPriority] = useState(null);
    const [sortBy, setSortBy] = useState("createdAt");
    const [showModal, setShowModal] = useState(false);


    if(!activeUser) {
        return <Redirect to="/" />
    }

    //convert data to presentation
  
    const filteredMsg = messages.filter(msg => {return (msg.title.includes(searchByStr) || msg.details.includes(searchByStr)) && (filterByPriority ? msg.priority === filterByPriority : true)});
    
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
            <div className="filters">
                <Container>
                    <Row>
                        <Col lg={5} md={12} sm={12}>
                            <Form>
                                <Form.Group controlId="formBasicSearch">
                                <Form.Control value={searchByStr} type="text" placeholder="Filter by text in Title and Details" onChange={e => setSearchByStr(e.target.value)}/>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={3} md={6} sm={12}>
                            <DropdownButton className="filter-btn" value={filterByPriority} id="dropdown-basic-button" title={"Filter by Priority: " + filterByPriority} onSelect={e => setFilterByPriority(e)}>
                                <Dropdown.Item eventKey="Info" href="#">Info</Dropdown.Item>
                                <Dropdown.Item eventKey="Important" href="#">Important</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <Form>
                                <Form.Group value={sortBy} as={Row} onChange={e => setSortBy(e.target.value)}>
                                    <Form.Label column as="legend">Sort By:</Form.Label>
                                    <Form.Check value="createdAt" type="radio" label="Date" name="formHorizontalRadios" id="formHorizontalRadios1" className="sort-by"/>
                                    <Form.Check value="priority" type="radio" label="Priority" name="formHorizontalRadios" id="formHorizontalRadios2" className="sort-by"/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        {activeUser.isCommitteeMember ?
                        <Col className="new-msg-btn">
                            <Button variant="link" onClick={() => setShowModal(true)}>New Message</Button>
                        </Col> : null}
                    </Row>
                </Container>
                
            </div>
            
            <Container>
                <MessagesView messages={filteredMsg} activeUser={activeUser} users={users} deleteMessage={deleteMessage} updateMessageFromModal={updateMessage}/>
            </Container>
            <NewMessageModal show={showModal} handleClose={() => setShowModal(false)} addMessage={addMessage}/>
        </div>
    );
}

export default Messages;