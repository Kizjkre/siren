import Main from './components/main/Main';
import Sidebar from './components/sidebar/Sidebar';
import Toolbar from './components/toolbar/Toolbar';

const App = () => {
  return (
    <div class="flex flex-col overflow-hidden h-screen w-screen">
      <Toolbar />
      <div class="flex flex-row grow">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default App;
