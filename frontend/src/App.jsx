import './App.css';
import Pomodoro from './components/Pomodoro';
import Todo from './components/Todo';

function App() {
  return (
    <div className="wrapper">
      <div className="component">
        <Pomodoro />
      </div>
      <div className="component">
        <Todo />
      </div>
    </div>
  );
}

export default App;
