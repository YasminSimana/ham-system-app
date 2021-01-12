// @flow
import * as React from 'react';
import { Form, FormControl, Nav, Navbar, NavbarBrand, NavDropdown, NavLink } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

export function AppNavbar(props) {
  const {activeUser, onLogOut} = props;
  return (
    <div>
      <Navbar>
        <Navbar.Brand href="#home">HAM System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {activeUser ? <Nav.Link href="#/">Home</Nav.Link> : null}
              {activeUser ? <Nav.Link href="#/Issues">Issues</Nav.Link> : null}
            </Nav>
            <Nav className="ml-auto">
              {activeUser ? null : <Nav.Link href="#/login">LogIn</Nav.Link>}
              {activeUser ? null : <Nav.Link href="#/signup">SignUp</Nav.Link>}
              {activeUser ? <Nav.Link href="#" onClick={() => onLogOut()}>LogOut</Nav.Link> : null}
            </Nav>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form> */}
        </Navbar.Collapse>
        </Navbar>
    </div>
  );
};