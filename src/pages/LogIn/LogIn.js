// @flow
import * as React from 'react';
import Parse from 'parse';
import UserModel from '../../models/UserModel';
import { Alert, Button, Form} from 'react-bootstrap';
import { Redirect } from 'react-router';
import './LogIn.css';
import { useState } from 'react';

export function LogIn(props) {
  const {onLogIn} = props;
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("alert-not-show");

  async function login() {
    setError("alert-not-show");
    try{
      const parseUser = await Parse.User.logIn(email,pwd);
      console.log('Logged in user', parseUser);
      const user = new UserModel(parseUser);
      onLogIn(user);
      setRedirect(true);
    }
    catch(error) {
      setError("alert-show");
      console.error('Error while logging in user', error);
    }
  }

  if (redirect) {
    return <Redirect to="/dashboards" />;
  }

  return (
    <div className="p-login">

      <Form>
      <Alert className={error} variant='danger'>
         Wrong Email or password... 
         <br></br>
         pleace try again
      </Alert>
        <h2>
          Log-In to HAM
        </h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control value={email} type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicUserName">
          <Form.Label>User name</Form.Label>
          <Form.Control value={userName} type="text" placeholder="Enter your username" onChange={(e)=>setUserName(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={pwd} type="password" placeholder="Password" onChange={(e)=>setPwd(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="button" onClick={login}>
          Submit
        </Button>
      </Form>
      
    </div>
  );
};