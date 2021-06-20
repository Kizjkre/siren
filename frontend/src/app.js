import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from './components/pages/Index';
import Workstation from './components/pages/Workstation';
import Editor from './components/pages/Editor';

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
