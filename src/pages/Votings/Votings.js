import React from 'react';
import { useState } from 'react';
import Parse from 'parse';
import { useEffect } from 'react';
import { Redirect } from 'react-router';
import VotingModel from '../../models/VotingModel';
import UserModel from '../../models/UserModel';
import NewVotingModal from '../../components/NewVotingModal/NewVotingModal';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import VotingsView from '../../components/VotingsView/VotingsView';
import { AppNavbar } from '../../components/Navbar/Navbar';
import './Votings.css';

function Votings(props) {
    const {activeUser, onLogOut} = props;
    const [activeVotingsArr, setActiveVotingsArr] = useState([]);
    const [finishedVotingsArr, setFinishedVotingsArr] = useState([]);
    const [searchByStr, setSearchByStr] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(()=> {
        async function fetchVotingsData() {
            const Voting = Parse.Object.extend('Voting');
            const query = new Parse.Query(Voting);
            query.equalTo("community", activeUser.community);
            const parseVotings = await query.find();
            // setFinishedVotingsArr(parseVotings.map(item => new VotingModel(item)));
            setActiveVotingsArr(parseVotings.filter(item => item.get("endDate") >= new Date()).map(filteredItem => new VotingModel(filteredItem)));
            setFinishedVotingsArr(parseVotings.filter(item => item.get("endDate") < new Date()).map(filteredItem => new VotingModel(filteredItem)));
            console.log('Voting found', parseVotings);
            console.log("active", activeVotingsArr);
            console.log("finished", finishedVotingsArr);
        }

        if (activeUser) {
            fetchVotingsData();
        }
        else {
            return <Redirect to="/" />;
        }
    }, [activeUser])

    async function addVoting(title, details, endDate, options) {
        const Voting = Parse.Object.extend('Voting');
        const myNewObject = new Voting();
        
        myNewObject.set('title', title);
        myNewObject.set('details', details);
        myNewObject.set('options', options);
        myNewObject.set('endDate', new Date(endDate));
        myNewObject.set('community', activeUser.parseUser.get("community"));
        myNewObject.set('results', []);
        
        try{
            const result = await myNewObject.save();
            console.log('Voting created', result);
            setActiveVotingsArr(activeVotingsArr.concat(new VotingModel(result)))
        }
        catch(error){
            console.error('Error while creating Voting: ', error);
        }
    }

    async function updateVoting(id, title, details, priority, img) {
        // const message = Parse.Object.extend('message');
        // const query = new Parse.Query(message);
        // const object = await query.get(id);
        // object.set('title', title);
        // object.set('details', details);
        // object.set('priority', parseInt(priority));
        // object.set('img',  new Parse.File(img.name, img));
        // const response = await object.save();
        // console.log('Updated message', response);
        // const tmpArr = messagesArr.filter(item => item.id !== id);
        // setMessagesArr(tmpArr.concat(new MessageModel(response))); 
    }

    //converting data into presentation
    const filteredFinishedVotings = finishedVotingsArr.filter(voting => (voting.title.includes(searchByStr) || voting.details.includes(searchByStr)));
    const filteredActiveVotings = activeVotingsArr;


    return (
        <div className="p-votings">
            <div>
            <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/>
            <div>
                <Container className="votings-cols">
                    <Col>
                        <Row>
                            <h3>Active Votings</h3>
                        </Row>
                        <Row>
                            <Col className="new-voting-btn">
                                <Button variant="link" onClick={() => setShowModal(true)}>New Voting</Button>
                            </Col>
                        </Row>
                        <Row className="accor-size" lg={12}>
                            <VotingsView isActive={true} votings={filteredActiveVotings} activeUser={activeUser} updateVotingFromModal={updateVoting}/>
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
                        <Row className="accor-size" lg={12}>
                            <VotingsView isActive={false} votings={filteredFinishedVotings} activeUser={activeUser} updateVotingFromModal={updateVoting}/>
                        </Row>
                    </Col>
                </Container>
                
            </div>
            
            <Container>
                
            </Container>
            <NewVotingModal show={showModal} handleClose={() => setShowModal(false)} addVoting={addVoting}/>
        </div>
        </div>
    );
}

export default Votings;