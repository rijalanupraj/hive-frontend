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
      src={
        "https://images.unsplash.com/photo-1593642647962-b9e4b4d8b9b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        
      }
      alt='Hulaka Hulaka 619'
      color={createAvatar('Hulaka Hulaka 619').color}
      
      
    >
      {createAvatar('Mamba').name}
    </Avatar>
  );
}
