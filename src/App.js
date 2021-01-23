import './App.css';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LogIn } from './pages/LogIn/LogIn';
import { SignUp } from './pages/SignUp/SignUp';
import { HomePage } from './pages/HomePage/HomePage';
import Issues from './pages/Issues/Issues';
import { useEffect, useState } from 'react';
import Parse from 'parse';
import UserModel from './models/UserModel';
import Messages from './pages/Messages/Messages';
import Votings from './pages/Votings/Votings';
import Tenants from './pages/Tenants/Tenants';
import Dashboards from './pages/Dashboards/Dashboards';
import MessageModel from './models/MessageModel';

function App() {
  const [activeUser, setActiveUser] = useState(
    Parse.User.current() ? new UserModel(Parse.User.current()) : null);
  const [redirect, setRedirect] = useState(false);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(()=> {
    async function fetchMessagesData() {
        const parseMessage = Parse.Object.extend('message');
        const query = new Parse.Query(parseMessage);
        // const community = new Parse.Object.extend('Community');
        // community.id = activeUser.community;
        console.log("active user", activeUser)
        query.equalTo("community", activeUser.community);
        try {const parseMessages = await query.find();
        setMessages(parseMessages.map(item => new MessageModel(item)));
        console.log("Success! messages arr: ", parseMessages);}
        catch (error) {
          console.log("Error! messages arr", error);
        }
    }

    async function fetchUsersData() {
      const parseUser = Parse.Object.extend('User');
      const query = new Parse.Query(parseUser);
      const community = new Parse.Object.extend('Community');
      community.id = activeUser.community;
      console.log("active user", activeUser)
      query.equalTo("community", activeUser.community);
      // query.equalTo("deleted", false);
      const parseUsers = await query.find();
      setUsers(parseUsers.map(item => new UserModel(item)));
      console.log("users arr", users);
    }

    if (activeUser) {
        fetchMessagesData();
        fetchUsersData();
    }
}, [activeUser])

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

  async function addMessage(title, details, priority, img) {
    // const community = Parse.Object.extend('Community');
    // const query = new Parse.Query(community);
    const message = Parse.Object.extend('message');
    const newMessage = new message();
    // const communityObject = await query.get(activeUser.community.id);
    
    newMessage.set('title', title);
    newMessage.set('details', details);
    newMessage.set('priorityName', priority);
    newMessage.set('img', new Parse.File(img.name, img));
    newMessage.set('createdBy', Parse.User.current());
    newMessage.set('readBy', [activeUser.id]);
    newMessage.set('community', activeUser.community)
    
    try {const parseMessage = await newMessage.save();
      console.log("Success! add message: ", parseMessage)
      setMessages(messages.concat(new MessageModel(parseMessage)));
    } catch (error){
      console.log("Error! add message", error);
    }
}

async function updateMessage(id, title, details, priority, img) {
    const message = Parse.Object.extend('message');
    const query = new Parse.Query(message);
    const object = await query.get(id);
    object.set('title', title);
    object.set('details', details);
    // object.set('priority', parseInt(priority));
    object.set('priorityName', priority);
    object.set('img',  new Parse.File(img.name, img));
    try {const response = await object.save();
      console.log('Success! updated message', response);
      const tmpArr = messages.filter(item => item.id !== id);
      setMessages(tmpArr.concat(new MessageModel(response)));
    } catch (error) {
      console.log("Error! update message", error);
    } 
}

async function deleteMessage(id) {
    const ParseMessage = Parse.Object.extend('message');
    const query = new Parse.Query(ParseMessage);
    const object = await query.get(id);
    const response = await object.destroy();
    console.log('Deleted message', response);
    const tmpArr = messages.filter(item => item.id !== id);
    setMessages(tmpArr);
}

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/"><HomePage activeUser={activeUser} onLogOut={handleLogout}/></Route>
          <Route exact path="/dashboards"><Dashboards activeUser={activeUser} onLogOut={handleLogout}/>{redirect ? <Redirect to="/" /> : null}</Route>
          <Route exact path="/tenants"><Tenants activeUser={activeUser} onLogOut={handleLogout}/>{redirect ? <Redirect to="/" /> : null}</Route>
          <Route exact path="/messages"><Messages activeUser={activeUser} users={users} messages={messages} addMessage={addMessage} updateMessage={updateMessage} deleteMessage={deleteMessage} onLogOut={handleLogout}/>{redirect ? <Redirect to="/" /> : null}</Route>
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
