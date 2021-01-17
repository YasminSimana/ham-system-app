import React, { useEffect, useState } from 'react';
import { AppNavbar } from '../../components/Navbar/Navbar';
import Parse from 'parse';
import { Button, Col, Container, Dropdown, DropdownButton, Form, FormCheck, FormGroup, FormLabel, Row } from 'react-bootstrap';
import MessageModel from '../../models/MessageModel';
import './Messages.css';
import MessagesView from '../../components/MessagesView/MessagesView';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

function Messages(props) {
    const {activeUser, onLogOut} = props;
    const [searchByStr, setSearchByStr] = useState("");
    const [messagesArr, setMessagesArr] = useState([]);
    const [filterByPriority, setFilterByPriority] = useState(null);
    const [sortBy, setSortBy] = useState("createdAt");

    useEffect(()=> {
        async function fetchData() {
            const parseMessage = Parse.Object.extend('message');
            const query = new Parse.Query(parseMessage);
            // query.contains("title", "");
            const parseMessages = await query.find();
            setMessagesArr(parseMessages.map(item => new MessageModel(item)));
        }

        if (activeUser) {
            fetchData()
        }
    }, [])

    // async function filterByStr(e){
    //     setSearchByStr(e.target.value);
    //     const parseMessage = Parse.Object.extend('message');
    //     const titleQuery = new Parse.Query(parseMessage);
    //     titleQuery.contains("title", e.target.value);
    //     const detailsQuery = new Parse.Query(parseMessage);
    //     detailsQuery.contains("details", e.target.value);
    //     const mainQuery = Parse.Query.or(titleQuery, detailsQuery);

    //     try {
    //         const results = await mainQuery.find();
    //         console.log('message found', results);
    //         for (let i of results){
    //             const message = new MessageModel(i);
    //             console.log(message);
    //         }
    //     } catch (error) {
    //         console.error('Error while fetching message', error);
    //     }
    // }


    //convert data to presentation
    const filteredMsg = messagesArr.filter(msg => (msg.title.includes(searchByStr) || msg.details.includes(searchByStr)) && filterByPriority ? msg.priority === parseInt(filterByPriority) : true);

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
                <Form>
                    <Form.Group controlId="formBasicSearch">
                    <Form.Control value={searchByStr} type="text" placeholder="Filter by text in Title and Details" onChange={e => setSearchByStr(e.target.value)}/>
                    </Form.Group>
                </Form>

                <DropdownButton value={filterByPriority} id="dropdown-basic-button" title={"Filter by Priority: " + filterByPriority} onSelect={e => setFilterByPriority(e)}>
                    <Dropdown.Item eventKey="1" href="#">1</Dropdown.Item>
                    <Dropdown.Item eventKey="2" href="#">2</Dropdown.Item>
                    <Dropdown.Item eventKey="3" href="#">3</Dropdown.Item>
                </DropdownButton>

                <Form>
                    <fieldset>
                        <Form.Group value={sortBy} as={Row} onChange={e => {console.log(e.target.value); return setSortBy(e.target.value)}}>
                            <Form.Label as="legend" column>
                                Sort By
                            </Form.Label>
                            <Form.Check value="createdAt" type="radio" label="Date" name="formHorizontalRadios" id="formHorizontalRadios1"/>
                            <Form.Check value="priority" type="radio" label="Priority" name="formHorizontalRadios" id="formHorizontalRadios2"/>
                        </Form.Group>
                    </fieldset>
                </Form>
            </div>
            <Container>
                <MessagesView messages={filteredMsg}/>
            </Container>
        </div>
    );
}

export default Messages;