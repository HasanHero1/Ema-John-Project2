import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './SignUp.css';

const SignUp = () => {
    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);

    const handleRegister = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value
        console.log(email, password, confirmPassword);

        if(password.length < 5){
            setError('Password must have siz charecters or longer.');
            return;
        }

        if(password !== confirmPassword){
            setError('Your password does not match.');
            return;
        }

        createUser(email, password)
        .then( result => {
            const user = result.user;
            console.log(user);
            form.reset();
        })
        .catch( error => {
            console.error(error, 'Some thing want wrong.')
        })

    }

    return (
        <div className='form-container'>
            <h2>Please SignUp..</h2>
            <form onSubmit={handleRegister} className='form'>
                <input className='form-item' type="email" name='email' placeholder='Entar your email' required />
                <input className='form-item' type="password" name='password' placeholder='Entar your password' required />
                <input className='form-item' type="password" name='confirmPassword' placeholder='Confirm password' required />
                <p>{error}</p>
                <p>Your have an account please, <Link to='/login'>Sign In</Link></p>
                <button className='form-item btn-1'>Sign Up</button>
                <button className='form-item btn-2'>SignUp with Google</button>
            </form>
        </div>
    );
};

export default SignUp;