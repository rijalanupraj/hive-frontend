import './App.css';
import { BrowserRouter } from 'react-router-dom';
import UserRoute from './routes/UserRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <UserRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
