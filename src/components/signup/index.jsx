import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.scss'
function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const hadnleLoginClick = () => {
        navigate('/')
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='container-signup' >
            <h2>Signup</h2>
            <div className='container-signup__formGroup' >
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className='container-signup__button' >
                        <button type="submit">Signup</button>
                        <p>Do you have an account ?</p>
                        <button onClick={hadnleLoginClick} type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
