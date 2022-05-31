// External Import
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { CircularProgress, Grid } from '@mui/material';
import './App.css';






// Route Import
import UserRoute from './routes/UserRoute';

// Redux Action Import
import { logInUserWithOauth, loadMe } from './redux/actions/authActions';

const App = () => {
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

  // Render Loading Spinner while app is loading
  const renderLoadingSpinner = () => {
    return (
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <CircularProgress />;
        </Grid>
      </Grid>
    );
  };

  return (
    <div className='App'>
      <BrowserRouter>{auth.appLoaded ? <UserRoute /> : renderLoadingSpinner()}</BrowserRouter>
    </div>
  );
};

export default App;
