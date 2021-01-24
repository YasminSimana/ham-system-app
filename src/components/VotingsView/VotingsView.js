import { useState } from 'react';
import { Accordion, Button, Card, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import './VotingsView.css';
import PieChart from '../PieChart/PieChart';
import EndDateUpdateModal from '../EndDataUpdateModal/EndDateUpdateModal';

function VotingsView(props) {
    const {isActive, votings, activeUser, updateVotingFromModal, updateSelectedVote, users} = props;
    const [selectedVoting, setSelectedVoting] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [userVote, setUserVote] = useState(null);


    function handleClose() {
        setEndDate(null);
        setShowModal(false);
      }
  
    async function handleUpdateEndDate(index) {
        console.log("update!", endDate)
        console.log("index", index)
        setShowModal(false);
        // updateVotingFromModal(endDate, votings[selectedVoting]);
    }
    
    function handleSelectedVote(item,voting) {
        console.log("item", item, voting);
        updateSelectedVote(item, voting)
    }
    
    const votingsView = votings.map((voting, index) =>   
        <Card key={index}>
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
                        <DropdownButton id="dropdown-variants-Info" variant="info" title="Your Vote" value={userVote}>
                            {voting.options.map(item=><Dropdown.Item value={item} onClick={()=>handleSelectedVote(item, voting)}>{item}</Dropdown.Item>)}
                        </DropdownButton>
                        <Button variant="light">Submit</Button>
                        
                            {isActive ?
                            <div>
                                Voting Precentage
                                {console.log("***users", users)}
                                <PieChart voting={voting} users={users} isResData={false} activeUser={activeUser}/> 
                            </div> : 
                            <div className="charts"> 
                                <div>
                                    Voting Precentage
                                    <PieChart voting={voting} users={users} isResData={false} activeUser={activeUser}/>
                                </div>
                                <div>
                                    Voting Results
                                    <PieChart voting={voting} users={users} isResData={true} activeUser={activeUser}/> 
                                </div>
                            </div>}
                        
                    </div>
                    <div className="end-date-section">
                    <p>
                            End Date: {voting.endDate.toLocaleDateString()}
                        </p>
                        {isActive ? <div className="voting-btm">
                        <Button onClick={() => setShowModal(true)}>Update End Date</Button>
                    </div> : null}
                    </div>
                    
                    
                </div>
            </Card.Body>
            </Accordion.Collapse>

            
         </Card>
    );

    return (
        <div className="c-voting-view">
            <Accordion defaultActiveKey={selectedVoting}>
                {votingsView}
            </Accordion>
            <EndDateUpdateModal show={showModal} handleClose={() => setShowModal(false)} updateVoting={handleUpdateEndDate} voting={votings[selectedVoting]} ></EndDateUpdateModal>
        </div>
    );
}

export default VotingsView;