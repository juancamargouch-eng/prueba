import { createBrowserRouter } from 'react-router-dom';
import { BandejaTramites } from '../modules/tramite/index';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <BandejaTramites />,
    },
]);