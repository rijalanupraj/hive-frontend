// hooks
// import useAuth from '../hooks/useAuth';
// utils
import createAvatar from "../utils/createAvatar";
//
import Avatar from "./Avatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  // const { user } = useAuth();

  return (
    // <Avatar
    //   src={user?.photoURL}
    //   alt={user?.displayName}
    //   color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
    //   {...other}
    // >
    //   {createAvatar(user?.displayName).name}
    // </Avatar>
    <Avatar
      src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar-1.jpg"
      alt="Hulaka Hulaka 619"
      color={createAvatar("Hulaka Hulaka 619").color}
    >
      {createAvatar("Mamba").name}
    </Avatar>
  );
}
