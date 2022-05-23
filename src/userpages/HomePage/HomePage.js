import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logOutUser } from '../../redux/actions/authActions';

function HomePage() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={{
      margin: '20vh',
      backgroundColor: '#fff',
      textAlign: 'center',
    }}>
      This is Home Page
      {auth.isAuthenticated ? <p>You are logged in</p> : <p>You are not logged in</p>}
      {auth.isAuthenticated ? (
        <button onClick={() => dispatch(logOutUser(navigate))}>Log Out</button>
      ) : (
        <button onClick={() => navigate('/login')}>Log In</button>
      )}
    </div>
  );
}

export default HomePage;
