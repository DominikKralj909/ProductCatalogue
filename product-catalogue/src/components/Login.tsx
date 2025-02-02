import { useCallback, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../api/apiClient';

function Login() {
	const navigate = useNavigate();
	
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
   

    const handleLogin = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await apiClient.post('/auth/login', {
                username,
                password,
            });

            const { token, refreshToken } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('isGuest', 'false');

            navigate('/catalogue');
        } catch (err) {
            setError('Invalid username or password');
        }
    }, [navigate, password, username]);




    const handleGuestLogin = useCallback(() => {
        navigate('/catalogue');
        localStorage.setItem('isGuest', 'true');
    }, [navigate]);

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <button onClick={handleGuestLogin}>Continue as Guest</button>
        </div>
    );
}

export default Login;
