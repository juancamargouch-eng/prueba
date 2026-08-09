import { useQuery } from '@tanstack/react-query';
import { obtenerTramite } from '../api/tramite.api.js';

export const useTramite = (id) => {
    return useQuery({
        queryKey: ['tramites', id],
        queryFn: () => obtenerTramite(id),
        enabled: Boolean(id), // no ejecuta la query si no hay id (ej. modal cerrado)
    });
};