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
    const {activeUser, messages, votings, addVoting, updateVoting, updateSelectedVote, onLogOut, users} = props;

    if (!activeUser) {
        return <Redirect to="/" />;
    }

    //convert data to presentation

    const messagesArr = messages.filter(msg => msg.readBy.indexOf(activeUser.id) === -1);
    const activeVotingsArr = votings.filter(item => ((item.endDate >= new Date()) && (item.results.filter(res => Object.values(res).indexOf(activeUser.id) === -1))));
    const finishedVotingsArr = votings.filter(item => item.endDate < new Date());



    return (
        <div className="p-dashboards">
            {/* <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/> */}
            <Container>
                <Row>
                    <Col md={6} sm={12}>
                        <p>New Messages {messagesArr.length}</p>
                         {messagesArr.length > 0 ?
                            <MessagesView messages={messagesArr} activeUser={activeUser} deleteMessage={null} updateMessageFromModal={null}/> :
                            <p>There are no new messages <EmojiSmileFill></EmojiSmileFill></p>}
                    </Col>
                    <Col md={6} sm={12}>
                        <p>Pending Votings {activeVotingsArr.length}</p>
                        {activeVotingsArr.length > 0 ?                        
                            <VotingsView isActive={true} votings={activeVotingsArr} activeUser={activeUser} updateVotingFromModal={updateVoting} updateSelectedVote={updateSelectedVote} users={users}/> :
                            <p>There are no pending votings <EmojiSmileFill></EmojiSmileFill></p>}
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12}>
                    <p>Voting Results</p>
                    {finishedVotingsArr.length > 0 ? 
                        <VotingsView isActive={false} votings={finishedVotingsArr} activeUser={activeUser} updateVotingFromModal={null} users={users}/> : 
                        <p>There are no votings results <EmojiSmileFill></EmojiSmileFill></p>}
                    </Col>
                    <Col md={6} sm={12}>
                        <p>New Issues</p>
                        There are no new issues <EmojiSmileFill></EmojiSmileFill>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboards;