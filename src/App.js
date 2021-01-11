import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/"><HomePage /></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
