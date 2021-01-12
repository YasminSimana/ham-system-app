import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LogIn } from './pages/LogIn/LogIn';
import { HomePage } from './pages/HomePage/HomePage';
import { AppNavbar } from './components/Navbar/Navbar';
import { Button } from 'react-bootstrap';
import Issues from './pages/Issues/Issues';
import { useState } from 'react';
import Parse from 'parse';
import UserModel from './models/UserModel';

function App() {
  const [activeUser, setActiveUser] = useState(
    Parse.User.current() ? new UserModel(Parse.User.current()) : null);


  function handleLogin(loggedInUser) {
    setActiveUser(loggedInUser);
  }

  function handleLogout(loggedInUser) {
    setActiveUser(null);
    Parse.User.logOut();
  }

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/"><HomePage activeUser={activeUser} onLogOut={handleLogout}/></Route>
          <Route exact path="/issues"><Issues activeUser={activeUser}/></Route>
          <Route exact path="/login"><LogIn onLogIn={handleLogin}/></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
