import React from 'react';
import { Accordion, Button, Card, Form} from 'react-bootstrap';
import './MessagesView.css';

function MessagesView(props) {
    const {messages, deleteMessage} = props;


    //convert data to presentation
    const messagesView = messages.map(msg => {
        const comments = msg.getComments();
        console.log("rr", comments);
        return <Card key={messages.indexOf(msg)}>
            <Accordion.Toggle as={Card.Header} eventKey={'' + messages.indexOf(msg)}>
            <div className="header-acc">
                <div>
                    {msg.title}
                </div>
                <div>
                    {msg.getIcon()}
                </div>
            </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={'' + messages.indexOf(msg)}>
                
            <Card.Body>
                <div className="msg-comments-view">
                    <div>
                        <img src={msg.img}></img>
                        <p>
                            Details: {msg.details}
                        </p>
                        <p>
                            Priority: {msg.getPriorityName()}
                        </p>
                    </div>
                    <div>
                        <p>
                            Comments:
                        </p>
                        <div>
                            bla
                        </div>
                        <div>
                            <Form.Control type="text" placeholder="Add comment" />
                            <div className="msg-btm">
                                <Button>Update</Button>
                                {/* <Button onClick={deleteMessage(msg.id, messages.indexOf(msg))}>Delete</Button> */}
                                <Button>Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
            </Accordion.Collapse>
        </Card>
    });

    return (
        <div className="c-msg-view">
            <Accordion defaultActiveKey="0">
                {messagesView}
            </Accordion>
        </div>
    );
}

export default MessagesView;