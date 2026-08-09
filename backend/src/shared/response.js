
export const ok = (data, meta = null) => ({
    ok: true,
    data,
    ...(meta && { meta }),
});

export const errorResponse = (mensaje, errores = null) => ({
    ok: false,
    mensaje,
    ...(errores && { errores }),
});