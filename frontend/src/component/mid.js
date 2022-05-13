import { Route, Routes } from 'react-router-dom';
import React from 'react';
import UpdateUserProfile from './User/updateUserProfile';
import Register from './User/register';
import Login from './User/login';
import UserProfile from './User/UserProfile';

const Mid = () => {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/viewprofile/:username' element={<UserProfile />} />
        <Route path='profile/update' element={<UpdateUserProfile />} />
      </Routes>
    </div>
  );
};

export default Mid;
