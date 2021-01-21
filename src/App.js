import './App.css';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LogIn } from './pages/LogIn/LogIn';
import { SignUp } from './pages/SignUp/SignUp';
import { HomePage } from './pages/HomePage/HomePage';
import Issues from './pages/Issues/Issues';
import { useState } from 'react';
import Parse from 'parse';
import UserModel from './models/UserModel';
import Messages from './pages/Messages/Messages';
import Votings from './pages/Votings/Votings';
import Tenants from './pages/Tenants/Tenants';

function App() {
  const [activeUser, setActiveUser] = useState(
    Parse.User.current() ? new UserModel(Parse.User.current()) : null);
  const [redirect, setRedirect] = useState(false);


  function handleLogin(loggedInUser) {
    setActiveUser(loggedInUser);
    setRedirect(false);
  }

  function handleLogout(loggedInUser) {
    setActiveUser(null);
    Parse.User.logOut();
    setRedirect(true);
  }

  function handleSignup(loggedInUser) {
    setActiveUser(loggedInUser);
    setRedirect(false);
  }

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/"><HomePage activeUser={activeUser} onLogOut={handleLogout}/></Route>
          <Route exact path="/tenants"><Tenants activeUser={activeUser} onLogOut={handleLogout}/>{redirect ? <Redirect to="/" /> : null}</Route>
          <Route exact path="/messages"><Messages activeUser={activeUser} onLogOut={handleLogout}/>{redirect ? <Redirect to="/" /> : null}</Route>
          <Route exact path="/votings"><Votings activeUser={activeUser} onLogOut={handleLogout}/>{redirect ? <Redirect to="/" /> : null}</Route>
          <Route exact path="/issues"><Issues activeUser={activeUser} onLogOut={handleLogout}/>{redirect ? <Redirect to="/" /> : null}</Route>
          <Route exact path="/login"><LogIn onLogIn={handleLogin}/></Route>
          <Route exact path="/signup"><SignUp onSignUp={handleSignup}/></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
