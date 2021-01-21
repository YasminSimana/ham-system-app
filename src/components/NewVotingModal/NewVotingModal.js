import { useState } from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';

function NewVotingModal(props) {
    const { show, handleClose, addVoting } = props;
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const [options, setOptions] = useState([]);
    
    function closeModal() {
      setTitle("");
      setDetails("");
      setEndDate(null);
      setOptions(null);
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

                  <Form.Group as={Row} controlId="formHorizontalImage">
                      <Form.Label column sm={2}>
                        Voting Options
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="number" placeholder="Voting Options" value={options} onChange={e => setOptions(e.target.value)}  />
                      </Col>
                  </Form.Group>
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