// External Import
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  ResetPassword,
  QuestionsPage,
  Page404,
  MyProfile,
} from '../userpages';

// Internal Import
import Navbar from '../components/Navbar/Navbar';

// Helper Route Import
import PrivateRoute from './PrivateRoute';

const UserRoute = () => {
  const auth = useSelector(state => state.auth);

  return (
    <>
      <Navbar />
      
      <main>
        <Routes>
          {/* Normal Routes Starts */}
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/questions' element={<QuestionsPage />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profile/:username' element={<UserProfile />} />
          <Route exact path='/solution/:solutionId' element={<ViewSolution />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/reset-password' element={<ResetPassword />} />
          {/* Normal Routes Ends */}

          {/* Private Routes Starts */}
          <Route exact path='/update-profile' element={<PrivateRoute auth={auth} />}>
            <Route exact path='/update-profile' element={<UpdateUserProfile />} />
          </Route>
          <Route exact path='/ask-question' element={<PrivateRoute auth={auth} />}>
            <Route exact path='/ask-question' element={<AskQuestion />} />
          </Route>
          <Route exact path='/post-solution/:questionId' element={<PrivateRoute auth={auth} />}>
            <Route exact path='/post-solution/:questionId' element={<PostSolution />} />
          </Route>

          <Route exact path='/myprofile' element={<PrivateRoute auth={auth} />}>
            <Route exact path='/myprofile' element={<MyProfile />} />
          </Route>
          {/* Private Routes End */}

          {/* Remaining Route Ends */}
          <Route path='/404' element={<Page404 />} />
          <Route path='*' element={<Navigate to='/404' />} />
          {/* Remaining Route Ends */}
        </Routes>
      </main>
    </>
  );
};

export default UserRoute;
