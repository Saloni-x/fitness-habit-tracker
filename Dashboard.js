import React from 'react';
import Habits from './Habits';
const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };
 return (
 <div>
            <h2>Welcome to Your Dashboard!</h2>
            <Habits />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
export default Dashboard;
