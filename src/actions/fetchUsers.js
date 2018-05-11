import api from '../api';

export default function fetchUsers() {
    return async function (dispatch, getState) {
        try {
            const users = await api.getUsers({ 
                ...getState().users.next, 
            });
            const { items, next } = users;
            const end = !!(next);
            dispatch({
                type: 'USERS_FETCH',
                items,
                next,
                end,
            });
        } catch (error) {
            dispatch({
                type: 'ROOM_ERROR',
                error,
            });
        }
    };
}
