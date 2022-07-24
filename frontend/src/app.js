import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import Workstation from './pages/Workstation';
import Presentation from './pages/Presentation';

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
