// @flow
import * as React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import './Navbar.css';


export function AppNavbar(props) {
  const {activeUser, onLogOut } = props;

  let greetUser;
  if (activeUser) {
    greetUser = "Hello " + activeUser.fname;
  }
  return (
    <div className="c-nav">
      <Navbar expand="md">
        <Navbar.Brand href="#/">HAM System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav activeKey="#" className="mr-auto">
              {activeUser ? <Nav.Link href="#/">Home</Nav.Link> : null}
              {activeUser ? <Nav.Link href="#/dashboards">Dashboards</Nav.Link> : null}
              {activeUser && activeUser.isCommitteeMember ? <Nav.Link href="#/tenants">Tenants</Nav.Link> : null}
              {activeUser ? <Nav.Link href="#/messages">Messages</Nav.Link> : null}
              {activeUser ? <Nav.Link href="#/votings">Votings</Nav.Link> : null}
            </Nav>
            <Nav className="ml-auto">
            {/* {activeUser ? <NavDropdown title={greetUser} id="basic-nav-dropdown">
                <NavDropdown.Item className="logout" href="#" onClick={() => onLogOut()}>LogOut</NavDropdown.Item>
                </NavDropdown> : null} */}
              {activeUser ? null : <Nav.Link href="#/login">LogIn</Nav.Link>}
              {activeUser ? null : <Nav.Link href="#/signup">SignUp</Nav.Link>}
              {activeUser ? <Nav.Link >{greetUser}</Nav.Link> : null}
              {activeUser ? <Nav.Link href="#" onClick={() => onLogOut()}>LogOut</Nav.Link> : null}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    </div>
  );
};