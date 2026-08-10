export interface AxiosLikeError extends Error {
    response?: { data?: { mensaje?: string } };
}