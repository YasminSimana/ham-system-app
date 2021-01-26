import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router';
import NewVotingModal from '../../components/NewVotingModal/NewVotingModal';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import VotingsView from '../../components/VotingsView/VotingsView';
import './Votings.css';


//Votings component is the page were user see all relevant votings and filter them
//Committee member can add a new vote, change current voting end date and see results and voting percentage
//Tenants can also vote on open votings and see results for finished votings
function Votings(props) {
    const {activeUser, votings, addVoting, updateVoting, updateSelectedVote, onLogOut, users} = props;
    const [activeVotingsArr, setActiveVotingsArr] = useState([]);
    const [finishedVotingsArr, setFinishedVotingsArr] = useState([]);
    const [searchByStr, setSearchByStr] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(()=> {
        if (activeUser) {
            setActiveVotingsArr(votings.filter(item => item.endDate >= new Date()));
            setFinishedVotingsArr(votings.filter(item => item.endDate < new Date()));
        }
        else {
            return <Redirect to="/" />;
        }
    }, [votings])

    if(!activeUser) {
        return <Redirect to="/" />
    }

    //converting data into presentation
    const filteredFinishedVotings = finishedVotingsArr.filter(voting => (voting.title.includes(searchByStr) || voting.details.includes(searchByStr)));
    const filteredActiveVotings = activeUser.isCommitteeMember ? activeVotingsArr : activeVotingsArr.filter(voting => voting.results.map(res => res["user"]).indexOf(activeUser.id) === -1);

    return (
        <div className="p-votings">
            <div>
                <Container className="votings-cols">
                    <Col>
                        <Row>
                            <h3>Active Votings</h3>
                        </Row>
                        <Row>
                        {activeUser.isCommitteeMember ?
                            <Col className="new-voting-btn">
                                <Button variant="link" onClick={() => setShowModal(true)}>New Voting</Button>
                            </Col> : null}
                        </Row>
                        <Row className="accor-size" sm={12}>
                            <VotingsView isActive={true} votings={filteredActiveVotings} activeUser={activeUser} updateVotingFromModal={updateVoting} updateSelectedVote={updateSelectedVote} users={users}/>
                        </Row>
                    </Col>
                    
                    <Col>
                        <Row>
                            <h3>Votings Results</h3>
                        </Row>
                        <Row>
                            <Col className="search-size">
                                <Form>
                                    <Form.Group controlId="formBasicSearch">
                                    <Form.Control value={searchByStr} type="text" placeholder="Filter by text in Title and Details" onChange={e => setSearchByStr(e.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="accor-size" sm={12}>
                            <VotingsView isActive={false} votings={filteredFinishedVotings} activeUser={activeUser} updateVotingFromModal={updateVoting} updateSelectedVote={updateSelectedVote} users={users}/>
                        </Row>
                    </Col>
                </Container>
                
            </div>
            
            <Container>
                
            </Container>
            <NewVotingModal show={showModal} handleClose={() => setShowModal(false)} addVoting={addVoting}/>
        </div>
    );
}

export default Votings;