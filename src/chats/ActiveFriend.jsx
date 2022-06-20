import React from "react";
// @mui
import { Avatar } from "@mui/material";
import MyAvatar from "../components/MyAvatar";

const ActiveFriend = ({ user, setCurrentFriend }) => {
  console.log(`This is user`);
  console.log(user);
  return (
    <div
      onClick={() =>
        setCurrentFriend({
          _id: user.userInfo._id,
          email: user.userInfo.email,
          image: user?.userInfo?.profilePhoto?.hasPhoto ? user?.userInfo?.profilePhoto.url : "",
          username: user.userInfo.username
        })
      }
      className='active-friend'
    >
      <div className='image-active-icon'>
        <div className='image'>
          {user?.userInfo?.profilePhoto?.hasPhoto ? (
            <Avatar src={user?.userInfo?.profilePhoto.url} alt={user?.userInfo?.username} />
          ) : (
            <MyAvatar />
          )}
          <div className='active-icon'></div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFriend;
