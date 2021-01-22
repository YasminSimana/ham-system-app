import { useState } from 'react';
import { Button, Col, Form, FormControl, Image, InputGroup, Modal, Row } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup';

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
      handleClose();
    }

    function handleAddMessage() {
      addVoting(title, details, endDate, options);
      closeModal();
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
                          Voting Title
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Voting Title" value={title} onChange={e => setTitle(e.target.value)} />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                        Voting Details
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Voting Details" value={details} onChange={e => setDetails(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                        Voting End Date
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="date" placeholder="Voting End Date" value={endDate} onChange={e => setEndDate(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  {options.map((option,index) => 
                    <Form.Group key={index} as={Row} controlId="formHorizontalImage">
                        <Form.Label column sm={2}>
                            Voting Option
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="number" placeholder={option}/>
                        </Col>
                    </Form.Group>)}
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