import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { AppNavbar } from '../../components/Navbar/Navbar';
import './Dashboards.css';
import Parse from 'parse'
import MessageModel from '../../models/MessageModel';
import { Col, Container, Row } from 'react-bootstrap';
import MessagesView from '../../components/MessagesView/MessagesView';
import VotingModel from '../../models/VotingModel';
import VotingsView from '../../components/VotingsView/VotingsView';
import { EmojiSmileFill } from 'react-bootstrap-icons';

function Dashboards(props) {
    const {activeUser, onLogOut} = props;
    const [messagesArr, setMessagesArr] = useState([]);
    const [activeVotingsArr, setActiveVotingsArr] = useState([]);
    const [finishedVotingsArr, setFinishedVotingsArr] = useState([]);

    useEffect(()=> {
        async function fetchMessagesData() {
            const parseMessage = Parse.Object.extend('message');
            const query = new Parse.Query(parseMessage);
            // const community = new Parse.Object.extend('Community');
            // community.id = activeUser.community;
            console.log("active user", activeUser)
            query.equalTo("community", activeUser.community);
            query.notEqualTo("readBy", activeUser.id);
            try {
                const parseMessages = await query.find();
                setMessagesArr(parseMessages.map(item => new MessageModel(item)));
                console.log("messages arr", parseMessages);
            }
            catch(error) {
                console.log("error while fetching messages", error);
            }
        }

        async function fetchVotingsData() {
            const Voting = Parse.Object.extend('Voting');
            const query = new Parse.Query(Voting);
            query.equalTo("community", activeUser.community);
            const parseVotings = await query.find();
            // setFinishedVotingsArr(parseVotings.map(item => new VotingModel(item)));
            // setActiveVotingsArr(parseVotings.filter(item => (item.get("endDate") >= new Date()) && (item.get("results").find(res => res["user"] !== activeUser.id))).map(filteredItem => new VotingModel(filteredItem)));
            setActiveVotingsArr(parseVotings.filter(item => ((item.get("endDate") >= new Date()) && 
            (item.get("results").filter(res => Object.values(res).indexOf(activeUser) === -1)))).map(filteredItem => new VotingModel(filteredItem)));
            
            setFinishedVotingsArr(parseVotings.filter(item => item.get("endDate") < new Date()).map(filteredItem => new VotingModel(filteredItem)));
            console.log('Voting found', parseVotings);
            console.log("active", activeVotingsArr);
            console.log("finished", finishedVotingsArr);
        }

        if (activeUser) {
            fetchMessagesData();
            fetchVotingsData();
        }
    }, [activeUser])

    if (!activeUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="p-dashboards">
            <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/>
            <Container>
                <Row>
                    <Col>
                        <p>New Messages {messagesArr.length}</p>
                         {messagesArr.length > 0 ?
                            <MessagesView messages={messagesArr} activeUser={activeUser} deleteMessage={null} updateMessageFromModal={null}/> :
                            <p>There are no new messages <EmojiSmileFill></EmojiSmileFill></p>}
                    </Col>
                    <Col>
                        <p>Pending Votings {activeVotingsArr.length}</p>
                        {activeVotingsArr.length > 0 ?
                            <VotingsView isActive={true} votings={activeVotingsArr} activeUser={activeUser} updateVotingFromModal={null}/> :
                            <p>There are no pending votings <EmojiSmileFill></EmojiSmileFill></p>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <p>Voting Results</p>
                    {finishedVotingsArr.length > 0 ? 
                        <VotingsView isActive={false} votings={finishedVotingsArr} activeUser={activeUser} updateVotingFromModal={null}/> : 
                        <p>There are no votings results <EmojiSmileFill></EmojiSmileFill></p>}
                    </Col>
                    <Col>
                        <p>New Issues</p>
                        There are no new issues <EmojiSmileFill></EmojiSmileFill>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboards;