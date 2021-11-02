import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from './components/pages/Index';
import Workstation from './components/pages/Workstation';
import Presentation from './components/pages/Presentation';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ Index } />
        <Route path="/workstation" component={ Workstation } />
        <Route path="/presentation" component={ Presentation } />
      </Switch>
    </HashRouter>
  );
};

export default App;
