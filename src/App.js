import logo from './logo.svg';
import './App.css';
import ChatSocketIo from './component/chatSocket/socketIO';

function App() {
  return (
    <div className="App">
      <ChatSocketIo />
    </div>
  );
}

export default App;
