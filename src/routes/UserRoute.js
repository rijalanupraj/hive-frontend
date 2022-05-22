// External Import
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// Page Import
import {
  Register,
  Login,
  UserProfile,
  UpdateUserProfile,
  HomePage,
  AskQuestion,
  ViewSolution,
  PostSolution,
  ForgotPassword,
  ResetPassword
} from '../userpages';

// Internal Import
import Navbar from '../components/Navbar/Navbar';

const UserRoute = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/viewprofile/:username' element={<UserProfile />} />
          <Route path='/profile/update' element={<UpdateUserProfile />} />
          <Route path='/viewprofile/:username' element={<UserProfile />} />
          <Route path='/question' element={<AskQuestion />} />
          <Route path='/solution' element={<ViewSolution />} />
          <Route path='/postsolution/:questionId' element={<PostSolution />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
        </Routes>
      </main>
    </>
  );
};

export default UserRoute;
