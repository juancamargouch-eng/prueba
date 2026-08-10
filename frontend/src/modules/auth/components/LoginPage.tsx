import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../../shared/api/httpClient';

export function LoginPage() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setCargando(true);
        try {
            const { data } = await httpClient.post('/auth/login', { usuario, password });
            localStorage.setItem('token', data.data.token);
            navigate('/');
        } catch {
            setError('Credenciales inválidas');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm bg-white border border-slate-200 rounded-lg p-8">
                <h1 className="text-lg font-semibold text-slate-800 mb-1">Iniciar sesión</h1>
                <p className="text-sm text-slate-500 mb-6">Sistema de Gestión de Trámites</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Usuario</label>
                        <input
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>

                    {error && <p className="text-xs text-red-600">{error}</p>}

                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2 rounded-md disabled:opacity-50"
                    >
                        {cargando ? 'Ingresando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}