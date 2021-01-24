import React from 'react';
import { Redirect } from 'react-router';
import { AppNavbar } from '../../components/Navbar/Navbar';
import './Issues.css';

function Issues(props) {
    const {activeUser, onLogOut} = props;

    if(!activeUser) {
        return <Redirect to="/" />
    }

    return (
        <div className="p-issues">
            <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/>
            issues - TBD
        </div>
    );
}

export default Issues;