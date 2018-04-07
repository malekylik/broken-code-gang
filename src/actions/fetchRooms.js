import api from '../api';

export default function fetchRooms() {
    return async function (dispatch, getState) {
        try {
            const room = await api.getCurrentUserRooms(getState().rooms.next);
            const { items } = room;
            const { next } = room;
            dispatch({
                type: 'ROOMS_FETCH',
                items,
                next,
            });
        } catch (error) {
            dispatch({
                type: 'ROOM_ERROR',
                error,
            });
        }
    };
}
