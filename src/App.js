import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LogIn } from './pages/LogIn/LogIn';
import { SignUp } from './pages/SignUp/SignUp';
import { HomePage } from './pages/HomePage/HomePage';
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
        console.log("Success! users arr", parseUsers.map(item => new UserModel(item)));
      } catch (error) {
        console.log("Error! users arr", error);
      }
    }

    // async function fetchUsersData() {
    //   const parseUser = Parse.Object.extend('User');
    //   const query = new Parse.Query(parseUser);
    //   const community = new Parse.Object.extend('Community');
    //   community.id = activeUser.community;
    //   console.log("active user", activeUser)
    //   query.equalTo("community", activeUser.community);
    //   query.equalTo("isCommitteeMember", false);
    //   query.equalTo("deleted", false);
    //   const parseUsers = await query.find();
    //   setTenantsArr(parseUsers.map(item => new UserModel(item)));
    //   console.log("tenants arr", parseUsers);

    async function fetchMessagesData() {
        const parseMessage = Parse.Object.extend('message');
        const query = new Parse.Query(parseMessage);
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
        console.log("Success! votings arr", votings);
      } catch (error){
        console.log("Error! votings arr", error);
      }
      
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
    const message = Parse.Object.extend('message');
    const newMessage = new message();
    
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
  const Voting = Parse.Object.extend('Voting');
  const query = new Parse.Query(Voting);
  const object = await query.get(voting.id);
  
  object.set('endDate', new Date(endDate));
 
  try {
      const response = await object.save();
      console.log('Success! updated voting end date', response);
      const tmpArr = votings.filter(item => item.id !== voting.id);
      setVotings(tmpArr.concat(new VotingModel(response))); 
  } catch (error) {
      console.log("Error! update voting end date", error);
  }
}

async function updateSelectedVote(vote, voting) {
  const Voting = Parse.Object.extend('Voting');
  const query = new Parse.Query(Voting);
  const object = await query.get(voting.id);
  let results = voting.results.concat({"user": activeUser.id, "vote": vote});
  console.log("voting.results", voting.results)
  console.log("results", results)
  object.set('results', results);
 
  try {
      const response = await object.save();
      console.log('Success! updated voting results', response);
      const tmpArr = votings.filter(item => item.id !== voting.id);
      setVotings(tmpArr.concat(new VotingModel(response))); 
  } catch (error) {
      console.log("Error! update voting results", error);
  }
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
  try {
      const parseUser = await newUser.save();
      setUsers(users.concat(new UserModel(parseUser)));
      console.log('Success! adding user(tenant)', parseUser);
    } catch (error){
      console.log("Error! adding user(tenant)", error);
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
      console.log('Success! updating user(tenant)', response);
      const tmpArr = users.filter(item => item.id !== id);
      setUsers(tmpArr.concat(new UserModel(response)));
  } catch(error) {
      console.error('Error! updating user(tenant)', error);
  }
}

async function deleteTenant(id) {
  debugger;
  const User = new Parse.User();
  const query = new Parse.Query(User);

  const user = await query.get(id);
  user.set('deleted', true);
  try {
      const response = await user.save();
      console.log('Success! delete user(tenant)', response);
      const tmpArr = users.filter(item => item.id !== id);
      setUsers(tmpArr);
  } catch(error) {
      console.error('Error! delete user(tenant)', error);
  }
}


  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/"><HomePage activeUser={activeUser} onLogOut={handleLogout}/></Route>
          <Route exact path="/dashboards"><Dashboards activeUser={activeUser} onLogOut={handleLogout} users={users}/></Route>
          <Route exact path="/tenants"><Tenants activeUser={activeUser} users={users} addTenant={addTenant} updateTenantInfo={updateTenantInfo} deleteTenan={deleteTenant} onLogOut={handleLogout}/></Route>
          <Route exact path="/messages"><Messages activeUser={activeUser} users={users} messages={messages} addMessage={addMessage} updateMessage={updateMessage} deleteMessage={deleteMessage} onLogOut={handleLogout}/></Route>
          <Route exact path="/votings"><Votings activeUser={activeUser} votings={votings} addVoting={addVoting} updateVoting={updateVoting} updateSelectedVote={updateSelectedVote} onLogOut={handleLogout} users={users}/></Route>
          <Route exact path="/login"><LogIn onLogIn={handleLogin}/></Route>
          <Route exact path="/signup"><SignUp onSignUp={handleSignup}/></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
