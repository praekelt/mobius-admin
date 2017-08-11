import { GET } from '../rest/types';
export const GET_USER = 'GET_USER';
export const getUser = (user) => ({
    type: GET_USER,
    payload: { user },
    meta: { resource: 'get-user', fetch: GET, cancelPrevious: false },
});
