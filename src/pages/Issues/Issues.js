import React from 'react';
import { AppNavbar } from '../../components/Navbar/Navbar';
import './Issues.css';

function Issues(props) {
    const {activeUser, onLogOut} = props;
    return (
        <div className="p-issues">
            <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/>
            issues
        </div>
    );
}

export default Issues;