import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (username === '123' && password === '123') {
            navigate('/users');
        } else {
            alert('Invalid username or password. Please try again.');
        }
    };

    return (
        <>
            <div>
                <h1>Zaloguj się</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            placeholder="Podaj login" 
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Podaj hasło" 
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
