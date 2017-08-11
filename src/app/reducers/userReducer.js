import { GET_USER } from '../actions/getUserAction';

export const userReducer = (previousState = 0, { type, payload }) => {
    if (type === GET_USER) {
        debugger;
        return payload.user;
    }
    return previousState;
}
