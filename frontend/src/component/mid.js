import { Route, Routes } from "react-router-dom";
import React from "react";

import Register from "./User/register";
import Login from "./User/login";
import Profile from "./User/userProfile";
import UpdateUserProfile from "./User/updateUserProfile";
import UpdateProfileSecurity from "./User/component/updateprofile/security";

const Mid = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="profile/update" element={<UpdateUserProfile />} />
       
      </Routes>
    </div>
  );
};

export default Mid;
