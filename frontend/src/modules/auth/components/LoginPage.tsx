import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../../shared/api/httpClient';

export function LoginPage() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await httpClient.post('/auth/login', { usuario, password });
            localStorage.setItem('token', data.data.token);
            navigate('/');
        } catch {
            setError('Credenciales inválidas');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '4rem auto' }}>
            <h2>Iniciar sesión</h2>
            <input placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Entrar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}