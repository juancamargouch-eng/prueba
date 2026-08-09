import { createBrowserRouter } from 'react-router-dom';
import { BandejaTramites } from '../modules/tramite/index.js';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <BandejaTramites />,
    },
]);