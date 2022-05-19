// External Import
import React, { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

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
} from "../userpages";

// Internal Import

const UserRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tokenExpired, setTokenExpired] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/viewprofile/:username" element={<UserProfile />} />
        <Route path="/profile/update" element={<UpdateUserProfile />} />
        <Route path="/question" element={<AskQuestion />} />
        <Route path="/solution" element={<ViewSolution />} />
        <Route path="/postsolution" element={<PostSolution />} />
      </Routes>
    </div>
  );
};

export default UserRoute;
