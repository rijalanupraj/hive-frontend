
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Mid from './component/mid';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Mid />
      </BrowserRouter>
        
    </div>
  );
}

export default App;
