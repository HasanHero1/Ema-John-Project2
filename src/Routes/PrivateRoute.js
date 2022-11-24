import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../components/Context/UserContext';

const PrivateRoute = ({ children }) => {
    const { user, loding } = useContext(AuthContext);
    const location = useLocation();

    if(loding){
      return <div>Loding...</div>
    }

    if (user && user.uid) {
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} replace ></Navigate>
};

export default PrivateRoute;