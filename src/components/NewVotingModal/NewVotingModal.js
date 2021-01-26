import { useState } from 'react';
import { Button, Col, Form, FormControl, FormGroup, Image, InputGroup, Modal, Row } from 'react-bootstrap';
import { FileMinusFill, PlusCircleFill } from 'react-bootstrap-icons';
import './NewVotingModal.css';

function NewVotingModal(props) {
    const { show, handleClose, addVoting } = props;
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const [options, setOptions] = useState([]);
    const [newOption, setNewOption] = useState("");
    
    function closeModal() {
      setTitle("");
      setDetails("");
      setEndDate(null);
      setOptions([]);
      setNewOption("");
      handleClose();
    }

    function handleAddMessage() {
      addVoting(title, details, endDate, options);
      closeModal();
    }
  
    function handleRemoveOption(option) {
        let items = [...options];
        const index = items.indexOf(option)
        if (index !== -1) {
            items.splice(index, 1);
            setOptions(items);
  }
    }
    return (
      <Modal show={show} onHide={closeModal} size="xl" className="c-new-voting-modal">
          <Modal.Header closeButton>
              <Modal.Title>New Voting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                
                  <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column sm={2}>
                          Title
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Voting Title" required value={title} onChange={e => setTitle(e.target.value)} />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                        Details
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Voting Details" required value={details} onChange={e => setDetails(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                        End Date
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="date" placeholder="Voting End Date" required value={endDate} onChange={e => setEndDate(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Label column sm={2}>
                             Options
                         </Form.Label>
                  {options.map((option,index) => 
                    <InputGroup className="options-group" key={index} as={Row} controlId="inputHorizontalOption">
                        
                         {/* <Col> */}
                                <FormControl className="option"
                                type="text" placeholder={option} required
                                />
                                <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={()=>handleRemoveOption(option)}>
                                    <FileMinusFill></FileMinusFill>
                                </Button>
                                </InputGroup.Append>
                        {/* </Col> */}
                    </InputGroup>
                    )}
                    <InputGroup className="sm-3">
                        <InputGroup.Prepend>
                        <Button variant="outline-secondary" onClick={()=>setOptions(options.concat(newOption))}>
                            <PlusCircleFill></PlusCircleFill>
                        </Button>
                        </InputGroup.Prepend>
                        <FormControl value={newOption} aria-describedby="basic-addon1" placeholder="Add option" onChange={e=>setNewOption(e.target.value)}/>
                    </InputGroup>

              </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                  Cancel
              </Button>
              <Button variant="primary" onClick={handleAddMessage}>
                  Create Voting
              </Button>
          </Modal.Footer>
      </Modal>
  );
  }

export default NewVotingModal;