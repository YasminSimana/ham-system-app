import React from 'react';
import { AppNavbar } from '../../components/Navbar/Navbar';

function Issues(props) {
    const {activeUser} = props;
    return (
        <div>
            <AppNavbar activeUser={activeUser}/>
            issues
        </div>
    );
}

export default Issues;