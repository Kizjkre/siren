import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './components/Index';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Index } />
      </Switch>
    </BrowserRouter>
  );
};

export default App;