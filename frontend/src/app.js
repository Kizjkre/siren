import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import Workstation from './components/Workstation';
import Editor from './components/Editor';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ Index } />
        <Route path="/workstation" component={ Workstation } />
        <Route path="/editor" component={ Editor } />
      </Switch>
    </HashRouter>
  );
};

export default App;
