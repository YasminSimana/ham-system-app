import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './Tenants.css';
import NewTenantModal from '../../components/NewTenantModat/NewTenantModal';
import TenantsView from '../../components/TenantsView/TenantsView';
import { Redirect } from 'react-router';


//Tenants component is the page were committee member can see all tenants related to his community and filter them
//Committee member can add a new tenant, change their details end delete them 
function Tenants(props) {
    const {activeUser, users, addTenant, updateTenantInfo, deleteTenant, onLogOut} = props;
    const [searchByStr, setSearchByStr] = useState("");
    const [showModal, setShowModal] = useState(false);

    if(!activeUser) {
        return <Redirect to="/" />
    }

    //convert data to presentation
    let tenants = users.filter(user=> user.deleted === false && user.isCommitteeMember === false);
    const filteredTenants = tenants.filter(tenant => (tenant.fname.includes(searchByStr) || tenant.lname.includes(searchByStr)));

        
    return (
        <div className="p-tenants">
            <div className="filters">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Form>
                                <Form.Group controlId="formBasicSearch">
                                <Form.Control value={searchByStr} type="text" placeholder="Filter by tenant's name" onChange={e => setSearchByStr(e.target.value)}/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="new-msg-btn">
                            <Button variant="link" onClick={() => setShowModal(true)}>New Tenant</Button>
                        </Col>
                    </Row>
                </Container>
                
            </div>
            
            <Container>
                <TenantsView tenants={filteredTenants} activeUser={activeUser} deleteTenant={deleteTenant} updateTenantsInfoFromModal={updateTenantInfo}/>
            </Container>
            <NewTenantModal show={showModal} handleClose={() => setShowModal(false)} addTenant={addTenant}/>
        </div>
    );
}

export default Tenants;