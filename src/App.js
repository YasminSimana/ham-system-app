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
import VotingModel from './models/VotingModel';

function App() {
  const [activeUser, setActiveUser] = useState(
    Parse.User.current() ? new UserModel(Parse.User.current()) : null);
  const [redirect, setRedirect] = useState(false);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [votings, setVotings] = useState([]);

  useEffect(()=> {
    async function fetchUsersData() {
      const parseUser = Parse.Object.extend('User');
      const query = new Parse.Query(parseUser);
      const community = new Parse.Object.extend('Community');
      community.id = activeUser.community;
      query.equalTo("community", activeUser.community);
      // query.equalTo("deleted", false);
      try {
        const parseUsers = await query.find();
        setUsers(parseUsers.map(item => new UserModel(item)));
        console.log("Success! users arr", users);
      } catch (error) {
        console.log("Error! users arr", error);
      }
    }

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

    async function fetchVotingsData() {
      const Voting = Parse.Object.extend('Voting');
      const query = new Parse.Query(Voting);
      query.equalTo("community", activeUser.community);
      try {
        const parseVotings = await query.find();
        setVotings(parseVotings.map(item => new VotingModel(item)));
        console.log("Success! users arr", votings);
      } catch (error){
        console.log("Error! votings arr", error);
      }
      // setActiveVotingsArr(parseVotings.filter(item => item.get("endDate") >= new Date()).map(filteredItem => new VotingModel(filteredItem)));
      // setFinishedVotingsArr(parseVotings.filter(item => item.get("endDate") < new Date()).map(filteredItem => new VotingModel(filteredItem)));
      
  }

    if (activeUser) {
        console.log("active user", activeUser);
        fetchUsersData();
        fetchMessagesData();
        fetchVotingsData();
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
    try {
      const response = await object.destroy();
      console.log('Success! deleted message', response);
      const tmpArr = messages.filter(item => item.id !== id);
      setMessages(tmpArr);
    } catch (error) {
      console.log("Error! delete message", error);
    }
}

async function addVoting(title, details, endDate, options) {
  const Voting = Parse.Object.extend('Voting');
  const myNewObject = new Voting();
  
  myNewObject.set('title', title);
  myNewObject.set('details', details);
  myNewObject.set('options', options);
  myNewObject.set('endDate', new Date(endDate));
  myNewObject.set('community', activeUser.parseUser.get("community"));
  myNewObject.set('results', []);
  
  try{
      const result = await myNewObject.save();
      console.log('Success! add voting', result);
      setVotings(votings.concat(new VotingModel(result)))
  }
  catch(error){
    console.log("Error! add voting", error);
  }
}

async function updateVoting(endDate, voting) {
  console.log("hellooo")
  const Voting = Parse.Object.extend('Voting');
  const query = new Parse.Query(Voting);
  const object = await query.get(voting.id);
  
  object.set('endDate', new Date(endDate));
 
  try {
      const response = await object.save();
      console.log('Updated Voting', response);
      const tmpArr = votings.filter(item => item.id !== voting.id);
      setVotings(tmpArr.concat(new VotingModel(response))); 
  } catch (error) {
      console.log("Error! update voting end date", error);
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

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/"><HomePage activeUser={activeUser} onLogOut={handleLogout}/></Route>
          <Route exact path="/dashboards"><Dashboards activeUser={activeUser} onLogOut={handleLogout}/></Route>
          <Route exact path="/tenants"><Tenants activeUser={activeUser} onLogOut={handleLogout}/></Route>
          <Route exact path="/messages"><Messages activeUser={activeUser} users={users} messages={messages} addMessage={addMessage} updateMessage={updateMessage} deleteMessage={deleteMessage} onLogOut={handleLogout}/></Route>
          <Route exact path="/votings"><Votings activeUser={activeUser} votings={votings} addVoting={addVoting} updateVoting={updateVoting} onLogOut={handleLogout} users={users}/></Route>
          <Route exact path="/issues"><Issues activeUser={activeUser} onLogOut={handleLogout}/></Route>
          <Route exact path="/login"><LogIn onLogIn={handleLogin}/></Route>
          <Route exact path="/signup"><SignUp onSignUp={handleSignup}/></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
