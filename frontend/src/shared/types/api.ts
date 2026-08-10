export interface ApiResponse<T> {
    ok: boolean;
    data: T;
    meta?: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}

export interface ApiError {
    ok: false;
    mensaje: string;
    errores?: { campo: string; detalle: string }[];
}