import React, { useEffect } from 'react';
import { useState } from 'react';
import { Accordion, Button, Card, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import './VotingsView.css';
import Parse from 'parse';
import { Pie } from "react-chartjs-2";
import PieChart from '../PieChart/PieChart';

function VotingsView(props) {
    const {isActive, votings, activeUser, updateVotingFromModal} = props;
    const [selectedVoting, setSelectedVoting] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [userVote, setUserVote] = useState(null);
    let selectItems;

    useEffect(()=>{
        if(votings && selectedVoting) {
            console.log("effect", votings[selectedVoting].options)
            selectItems = votings[selectedVoting].options.map((opt) => {
               return (<Dropdown.Item value={opt}>{opt}</Dropdown.Item>)
            });
            console.log("items", selectItems)
        }
    },
    [selectedVoting]);

    function handleClose() {
        setEndDate(null);
        setShowModal(false);
      }
  
    async function handleUpdateEndDate() {
        console.log("update!", endDate)
        setShowModal(false);

        const Voting = Parse.Object.extend('Voting');
        const query = new Parse.Query(Voting);
        // here you put the objectId that you want to update
        const object = await query.get(votings[selectedVoting].id);
        
        object.set('endDate', new Date(endDate));
       
        const response = await object.save();
        console.log('Updated Voting', response);
        // }, (error) => {
        //     if (typeof document !== 'undefined') document.write(`Error while updating Voting: ${JSON.stringify(error)}`);
        //     console.error('Error while updating Voting', error);
        // });
    }
    
    
    const votingsView = votings.map((voting, index) => {
        
        return <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={'' + index} onClick={e=>setSelectedVoting(index)}>
            <div className="header-acc">
                <div>
                    {voting.title}
                </div>
                {isActive ? null : <div>
                    Result: {voting.getFinalResult()}
                </div>}
            </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={'' + index}>
                
            <Card.Body>
                <div className="voting-comments-view">
                    <div>
                        <p>
                            Details: {voting.details}
                        </p>
                        <p>
                            Your vote:
                        </p>
                        options
                        {selectedVoting !== null ? votings[selectedVoting].options.map(item=>{console.log("item",item); return parseInt(item)}) : null}
                        <DropdownButton id="dropdown-variants-Info" variant="info" title="Your Vote" value={userVote} onClick={(e) => {console.log("e",selectedVoting, e.target.value); return(setUserVote(e.target.value))}}>
                        {/* <Dropdown.Item value="1">1</Dropdown.Item>
                        <Dropdown.Item value="2">2</Dropdown.Item> */}
                        {selectItems}
                        </DropdownButton>
                        <Button variant="light">Submit</Button>
                        
                            {isActive ?
                            <div>
                            Voting Precentage
                            <PieChart voting={votings[selectedVoting]} isResData={false} activeUser={activeUser}/>
                            Voting Results
                            <PieChart voting={votings[selectedVoting]} isResData={true} activeUser={activeUser}/> </div>: null}
                        
                    </div>
                    <div className="end-date-section">
                    <p>
                            End Date: {voting.endDate.toLocaleDateString()}
                        </p>
                        {isActive ? <div className="voting-btm">
                        <Button onClick={() => {console.log("hhhh", selectedVoting, showModal); return setShowModal(true)}}>Update End Date</Button>
                    </div> : null}
                    </div>
                    
                    
                </div>
            </Card.Body>
            </Accordion.Collapse>

            {selectedVoting !== null ? <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Change the end date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {console.log("vote",selectedVoting,  votings)}
                    Current End Date:
                    {votings[selectedVoting].endDate.toLocaleDateString()}
                    <Form>
                    <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={6}>
                        New End Date
                      </Form.Label>
                      <Col sm={6}>
                          <Form.Control type="date" placeholder="New End Date" value={endDate} onChange={e => setEndDate(e.target.value)}  />
                      </Col>
                  </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdateEndDate}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal> : null}
        </Card>
    });

    return (
        <div className="c-voting-view">
            <Accordion defaultActiveKey={selectedVoting}>
                {console.log("fffffff". votingsView)}
                {votingsView}
            </Accordion>
        </div>
    );
}

export default VotingsView;