// External Import
import React, { useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

// Page Import
import { Register, Login, UserProfile, UpdateUserProfile, ForgotPassword } from '../userpages';

// Internal Import

const UserRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tokenExpired, setTokenExpired] = useState(false);

  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/viewprofile/:username' element={<UserProfile />} />
        <Route path='profile/update' element={<UpdateUserProfile />} />
        <Route path='/forgotpassword' element={< ForgotPassword/>} />
      </Routes>
    </div>
  );
};

export default UserRoute;
