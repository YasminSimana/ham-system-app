import React from 'react';
import { Button, Card, CardImg, Image, Row } from 'react-bootstrap';
import AppCard from '../Card/Card';
import './MessagesView.css';

function MessagesView(props) {
    const {messages} = props;

    //convert data to presentation
    const messagesView = messages.map(msg => <Row key={msg.id}><AppCard title={msg.title} desc={msg.details}></AppCard></Row>);
    return (
        <div className="c-msg-view">
            {messagesView}
        </div>
    );
}

export default MessagesView;