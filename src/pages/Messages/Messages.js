import React, { useEffect, useState } from 'react';
import { AppNavbar } from '../../components/Navbar/Navbar';
import Parse from 'parse';
import { Button, Container, Form, Row } from 'react-bootstrap';
import MessageModel from '../../models/MessageModel';
import AppCard from '../../components/Card/Card';
import './Messages.css';

function Messages(props) {
    const {activeUser, onLogOut} = props;
    const [searchByStr, setSearchByStr] = useState("");
    const [messagesArr, setMessagesArr] = useState([]);

    useEffect(()=> {
        async function fetchData() {
            const parseMessage = Parse.Object.extend('message');
            const query = new Parse.Query(parseMessage);
            query.contains("title", "");
            const parseMessages = await query.find();
            setMessagesArr(parseMessages.map(item => new MessageModel(item)));
        }

        if (activeUser) {
            fetchData()
        }
    }, [activeUser])

    async function filterByStr(e){
        setSearchByStr(e.target.value);
        const parseMessage = Parse.Object.extend('message');
        const titleQuery = new Parse.Query(parseMessage);
        titleQuery.contains("title", e.target.value);
        const detailsQuery = new Parse.Query(parseMessage);
        detailsQuery.contains("details", e.target.value);
        const mainQuery = Parse.Query.or(titleQuery, detailsQuery);

        try {
            const results = await mainQuery.find();
            console.log('message found', results);
            for (let i of results){
                const message = new MessageModel(i);
                console.log(message);
            }
        } catch (error) {
            console.error('Error while fetching message', error);
        }
    }
    
    //convert data to presentation
    console.log("pres", messagesArr)
    let messagesView;
    if(messagesArr.length > 0){
        messagesView = messagesArr.map(message => <Row><AppCard title={message.title} desc={message.details}></AppCard></Row>)
    }
    return (
        <div className="p-messages">
            <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/>

            <Form>
                <Form.Group controlId="formBasicSearch">
                <Form.Control value={searchByStr} type="text" placeholder="Filter by text in Title and Details" onChange={filterByStr}/>
                </Form.Group>
            </Form>
            <Container>
                {messagesView}
            </Container>
        </div>
    );
}

export default Messages;