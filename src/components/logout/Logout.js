import React from 'react';
import { signOutUser } from '../../auth/authServices';

function Logout() {
  return <button onClick={signOutUser}>Log out</button>;
}

export default Logout;
