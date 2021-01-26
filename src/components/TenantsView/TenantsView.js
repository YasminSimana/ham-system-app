import React from 'react';
import { useState } from 'react';
import { Accordion, Button, Card, Col, Container, Row } from 'react-bootstrap';
import './TenantsView.css';
import UpdateTenantsModal from '../UpdateTenantsModal/UpdateTenantsModal';

function TenantsView(props) {
    const {tenants, activeUser, deleteTenant, updateTenantsInfoFromModal} = props;
    const [showModal, setShowModal] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState(null);

    function handleDelete() {
        deleteTenant(tenants[selectedTenant].id)
        setSelectedTenant(null)
    }

    const tenantsView = tenants.map((tenant, index) => 
        <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={'' + index} onClick={e=>setSelectedTenant(index)}>
            <div className="header-acc">
                {tenant.fname} {tenant.lname}
            </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={'' + index}>
                
            <Card.Body>
                <Container>
                    <Row className="tenant-body">
                        <Col lg={4} md={4} sm={12}>
                        <img src={tenant.img}></img>
                        </Col>
                        <Col className="tenant-info" lg={4} md={4} sm={12}>
                        <p>Name: {tenant.fname} {tenant.lname}</p>
                        <p>Email: {tenant.email}</p>
                        <p>Building: {tenant.building}</p>
                        <p>Apt: {tenant.apartment}</p>
                        </Col>
                        <Col lg={3} md={3} sm={12}>
                        <div className="edit-btm">
                            
                            <Button onClick={() => setShowModal(true)}>Update</Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
            </Accordion.Collapse>
        </Card>
    );

    return (
        <div className="c-tenant-view">
            <Accordion defaultActiveKey={selectedTenant}>
                {tenantsView}
            </Accordion>
            {tenants && selectedTenant !== null ? 
            <UpdateTenantsModal
                show={showModal} 
                user={tenants[selectedTenant]}
                handleClose={() => setShowModal(false)} 
                updateTenant={updateTenantsInfoFromModal} 
                id={tenants[selectedTenant].id} 
                currentFname={tenants[selectedTenant].fname} 
                currentLname={tenants[selectedTenant].lname} 
                currentEmail={tenants[selectedTenant].email}
                currentBuilding={tenants[selectedTenant].building}
                currentApartment={tenants[selectedTenant].apartment}
                currentImg={tenants[selectedTenant].img}></UpdateTenantsModal> : null}
        </div>
    );
}

export default TenantsView;