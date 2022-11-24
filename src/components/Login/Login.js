import React from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './Login.css';

const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        userLogin(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error, 'some thing wrong.')
            })
    }


    return (
        <div className='form-container'>

            <h2>Please Login..</h2>
            <form onSubmit={handleLogin} className='form'>
                <input className='form-item' type="email" name='email' placeholder='Entar your email' required />
                <input className='form-item' type="password" name='password' placeholder='Entar your password' required />
                <p>Your don't have any account please, <Link to='/signup'>Sign Up</Link></p>
                <button className='form-item btn-1'>Login</button>
                <button className='form-item btn-2'>Login with Google</button>
            </form>
        </div>
    );
};

export default Login;