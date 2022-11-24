import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { AuthContext } from '../Context/UserContext';
import './Header.css';

const Header = () => {
    const {user, handleSignOut} = useContext(AuthContext);

    
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            {user?.email && <span className='userInfo'>{user.email}</span> }
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {/* <Link to="/login">Login</Link> */}
                {
                    user?.uid ?
                    <Link onClick={handleSignOut} to="/login">Sign Out</Link> 
                    :
                    <>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Login</Link>
                    </>
                }
                
            </div>
        </nav>
    );
};

export default Header;