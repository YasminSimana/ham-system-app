// @flow
import * as React from 'react';
import { AppNavbar } from '../../components/Navbar/Navbar';

export function HomePage(props) {
  const {activeUser, onLogOut} = props;
  return (
    <div>
      <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/>
      home
    </div>
  );
};