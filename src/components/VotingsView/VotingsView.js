import { useState } from 'react';
import { Accordion, Button, Card, Dropdown, DropdownButton} from 'react-bootstrap';
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
  
    function handleUpdateEndDate(endDate, voting) {
        setShowModal(false);
        updateVotingFromModal(endDate, voting);
    }
    
    function handleSelectedVote(item,voting) {
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
                        {activeUser.isCommitteeMember || !isActive ? null :
                        <div>
                        <p>
                            Your vote:
                        </p>
                        <DropdownButton id="dropdown-variants-Info" variant="info" title="Your Vote" value={userVote}>
                            {voting.options.map(item=><Dropdown.Item value={item} onClick={()=>handleSelectedVote(item, voting)}>{item}</Dropdown.Item>)}
                        </DropdownButton> 
                        </div>}
                        
                            {isActive && activeUser.isCommitteeMember ?
                            <div>
                                Voting Precentage
                                <PieChart voting={voting} users={users} isResData={false} activeUser={activeUser}/> 
                            </div> : null}
                            {!isActive && activeUser.isCommitteeMember ?
                            <div className="charts"> 
                                <div>
                                    Voting Precentage
                                    <PieChart voting={voting} users={users} isResData={false} activeUser={activeUser}/>
                                </div>
                                <div>
                                    Voting Results
                                    <PieChart voting={voting} users={users} isResData={true} activeUser={activeUser}/> 
                                </div>
                            </div> : null}
                            {!isActive && !activeUser.isCommitteeMember ?
                            <div className="charts"> 
                                <div>
                                    Voting Results
                                    <PieChart voting={voting} users={users} isResData={true} activeUser={activeUser}/> 
                                </div>
                            </div> : null}
                        
                    </div>
                    <div className="end-date-section">
                    <p>
                            End Date: {voting.endDate.toLocaleDateString()}
                        </p>
                        {isActive  && activeUser.isCommitteeMember? <div className="voting-btm">
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