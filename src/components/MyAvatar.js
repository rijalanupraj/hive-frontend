// hooks
// import useAuth from '../hooks/useAuth';
// utils
import createAvatar from "../utils/createAvatar";
//
import Avatar from "./Avatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ profile, ...other }) {
  return (
    <Avatar src={profile && profile.profilePhoto && profile.profilePhoto.url} {...other}></Avatar>
  );
}
