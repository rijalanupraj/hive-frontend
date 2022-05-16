import './App.css';
import { BrowserRouter } from 'react-router-dom';
import UserRoute from './routes/UserRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

// Internal Import
import { logInUserWithOauth, loadMe } from './redux/actions/authActions';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadMe());
  }, [loadMe]);

  useEffect(() => {
    if (window.location.hash === '#_=_') window.location.hash = '';

    const cookieJwt = Cookies.get('x-auth-cookie');
    if (cookieJwt) {
      Cookies.remove('x-auth-cookie');
      dispatch(logInUserWithOauth(cookieJwt));
    }
  }, []);

  useEffect(() => {
    if (!auth.appLoaded && !auth.isLoading && auth.token && !auth.isAuthenticated) {
      loadMe();
    }
  }, [auth.isAuthenticated, auth.token, loadMe, auth.isLoading, auth.appLoaded]);

  return (
    <div className='App'>
      <BrowserRouter>{auth.appLoaded ? <UserRoute /> : <div>Loading...</div>}</BrowserRouter>
    </div>
  );
}

export default App;
