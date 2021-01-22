import React from 'react';
import { AppNavbar } from '../../components/Navbar/Navbar';
import './Dashboards.css'

function Dashboards(props) {
    const {activeUser, onLogOut} = props;

    return (
        <div className="p-dashboards">
            <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/>
            dash
        </div>
    );
}

export default Dashboards;