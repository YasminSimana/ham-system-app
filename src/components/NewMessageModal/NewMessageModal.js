import { useState } from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';

function NewMessageModal(props) {
    const { show, handleClose, addMessage } = props;
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    // const [priority, setPriority] = useState(1);
    const [priority, setPriority] = useState("Info");
    const [img, setImg] = useState("");
    
    function closeModal() {
      setTitle("");
      setDetails("");
      setPriority(null);
      setImg(null);
      handleClose();
    }

    function handleFileChange(e) {
      if (e.target.files.length === 1) {
          setImg(e.target.files[0]);
      } else {
          setImg(null);
      }
    }

    function handleAddMessage() {
      addMessage(title, details, priority, img);
      closeModal();
    }
  
    const imgURL = img ? URL.createObjectURL(img) : "";

    return (
      <Modal show={show} onHide={closeModal} size="xl" className="c-new-message-modal">
          <Modal.Header closeButton>
              <Modal.Title>New Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                
                  <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column sm={2}>
                          Message Title
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Message Title" value={title} onChange={e => setTitle(e.target.value)} />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                          Message Details
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Message Details" value={details} onChange={e => setDetails(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  {/* <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                          Message Priority
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="number" placeholder="Message Priority" value={priority} onChange={e => setPriority(e.target.value)}  />
                      </Col>
                  </Form.Group> */}

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                          Priority
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Message Priority" value={priority} onChange={e => setPriority(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalImage">
                      <Form.Label column sm={2}>
                          Message Image
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                      </Col>
                  </Form.Group>
              </Form>
              <Image src={imgURL} className="img-preview"/>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                  Cancel
              </Button>
              <Button variant="primary" onClick={handleAddMessage}>
                  Create Message
              </Button>
          </Modal.Footer>
      </Modal>
  );
  }

export default NewMessageModal;