import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.scss';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleSignupClick = () => {
        navigate('/signup')
    }

    const handleLoginClick = () => {

        if (username === 'Pinsoft' && password === '12345') {
            navigate('/MainPage')
        }
        else if (username === '' || password === '') {
            alert('Giriş bilgilerini doldurunuz !')

        }
        else if (username !== 'Pinsoft') {
            alert('Kullanıcı adınız hatalı !')
        }
        else {
            alert('Şifreniz hatalı !')
        }
    }

    return (
        <div className="container-login">
            <h2>Login</h2>
            <div className='container-login__form-group' >
                <form onSubmit={handleSubmit}>
                    <div className="container-login__formGroup__username">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div className="container-login__formGroup__password">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <p className='container-login__account' >If you don't have an account</p>
                    <div className='container-login__button' >
                        <button onClick={handleLoginClick} type="submit">Login</button>
                        <button onClick={handleSignupClick} type="submit" >Signup</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
