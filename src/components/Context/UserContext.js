import React from 'react';
import { createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import app from '../../Firebase/Firebase.init';
import { useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext();
const auth = getAuth(app);

// const user = {email: 'abc'}
const UserContext = ({children}) => {
    const [user, setUser] = useState({});
    const [loding, setLoding] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        setLoding(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleSignOut = () => {
        return signOut(auth);
        
    }

    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoding(false);
            // console.log('CurrentUser insite state change', currentUser);
        });

        return () => unSubscribe();
        
    }, [])

    const authInfo = {user, createUser, loding, setLoding, userLogin, handleSignOut}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;