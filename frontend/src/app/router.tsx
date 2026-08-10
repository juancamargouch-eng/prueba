import { createBrowserRouter, Navigate } from 'react-router-dom';
import { BandejaTramites } from '../modules/tramite/index';
import { LoginPage } from '../modules/auth/components/LoginPage';

function RutaProtegida({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token');
    return token ? <>{children}</> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
    { path: '/login', element: <LoginPage /> },
    { path: '/', element: <RutaProtegida><BandejaTramites /></RutaProtegida> },
]);