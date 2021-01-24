import React, { useEffect, useState } from 'react';
import { AppNavbar } from '../../components/Navbar/Navbar';
import Parse from 'parse';
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import './Tenants.css';
import UserModel from '../../models/UserModel';
import NewTenantModal from '../../components/NewTenantModat/NewTenantModal';
import TenantsView from '../../components/TenantsView/TenantsView';
import { Redirect } from 'react-router';

function Tenants(props) {
    const {activeUser, onLogOut} = props;
    const [tenantsArr, setTenantsArr] = useState([]);
    const [searchByStr, setSearchByStr] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(()=> {
        async function fetchUsersData() {
            const parseUser = Parse.Object.extend('User');
            const query = new Parse.Query(parseUser);
            const community = new Parse.Object.extend('Community');
            community.id = activeUser.community;
            console.log("active user", activeUser)
            query.equalTo("community", activeUser.community);
            query.equalTo("isCommitteeMember", false);
            query.equalTo("deleted", false);
            const parseUsers = await query.find();
            setTenantsArr(parseUsers.map(item => new UserModel(item)));
            console.log("tenants arr", parseUsers);
        }

        if (activeUser) {
            fetchUsersData();
        }
    }, [activeUser])

    if(!activeUser) {
        return <Redirect to="/" />
    }

    async function addTenant(fname, lname, email, building, apartment, img) {
        const user = Parse.Object.extend('User');
        const newUser = new user();
        let acl = new Parse.ACL();
        acl.setPublicWriteAccess( true );
        acl.setPublicReadAccess( true);
        newUser.setACL( acl );
        newUser.set('fname', fname);
        newUser.set('lname', lname);
        newUser.set('username', fname + lname);
        newUser.set('email', email);
        newUser.set('fetchEmail', email);
        newUser.set('password', "123");
        newUser.set('building', building);
        newUser.set('apartment', apartment);
        newUser.set('img', new Parse.File(img.name, img));
        newUser.set('community', activeUser.parseUser.get("community"));
        newUser.set('isCommitteeMember', false);
        try {const parseUser = await newUser.save();
            setTenantsArr(tenantsArr.concat(new UserModel(parseUser)));}
        catch (error){
            console.log("error", error);
        }
    }

    async function updateTenantInfo(id, fname, lname, email, building, apartment, img) {
        const User = new Parse.User();
        const query = new Parse.Query(User);
        const user = await query.get(id);
        user.set('fname', fname);
        user.set('lname', lname);
        user.set('email', email);
        user.set('fetchEmail', email);
        user.set('building', building);
        user.set('apartment', apartment);
        user.set('img',  new Parse.File(img.name, img));
        try {
            const response = await user.save();
            console.log('Updated user', response);
            const tmpArr = tenantsArr.filter(item => item.id !== id);
            setTenantsArr(tmpArr.concat(new UserModel(response)));
        }
        catch(error) {
            console.error('Error while updating user', error);
        }

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

    async function deleteTenant(id) {
        const User = new Parse.User();
        const query = new Parse.Query(User);

        const user = await query.get(id);
        user.set('deleted', true);
        try {
            const response = await user.save();
            console.log('Deleted user', response);
            const tmpArr = tenantsArr.filter(item => item.id !== id);
            setTenantsArr(tmpArr);
        }
        catch(error) {
            console.error('Error while updating user', error);
        }


        // const User = new Parse.User();
        // const query = new Parse.Query(User);
        // const user = await query.get(id);
  
        // try { 
        //     const response = await user.destroy();
        //     console.log('Deleted user', response);
        // }
        // catch(error){
        //     console.error('Error while deleting user', error);
        // }

        // const ParseMessage = Parse.Object.extend('message');
        // const query = new Parse.Query(ParseMessage);
        // const object = await query.get(id);
        // const response = await object.destroy();
        // console.log('Deleted message', response);
        // const tmpArr = messagesArr.filter(item => item.id !== id);
        // setMessagesArr(tmpArr);
    }


    //convert data to presentation
    const filteredTenants = tenantsArr.filter(tenant => (tenant.fname.includes(searchByStr) || tenant.lname.includes(searchByStr)));

        
    return (
        <div className="p-tenants">
            <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/>
            <div className="filters">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Form>
                                <Form.Group controlId="formBasicSearch">
                                <Form.Control value={searchByStr} type="text" placeholder="Filter by text in Title and Details" onChange={e => setSearchByStr(e.target.value)}/>
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