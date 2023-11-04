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
                    <div className='container-signup__formGroup__username' >
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div className='container-signup__formGroup__email' >
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className='container-signup__formGroup__password' >
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    <p className='container-signup__account' >Do you have an account ?</p>
                    <div className='container-signup__button' >
                        <button type="submit">Signup</button>
                        <button onClick={hadnleLoginClick} type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
