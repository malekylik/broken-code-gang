import api from '../api';

export default function addRoom(name, user) {
    return async function (dispatch) {
        try {
            let room = await api.createRoom(name);

            room = await api.currentUserJoinRoom(room._id);

            for (let current of user) {
                await api.userJoinRoom(current, room._id);
            }

            await api.addedToChat(user, await api.getRoom(room._id));

            dispatch({
                type: 'ROOM_ADD',
                room,
            });
        } catch (error) {
            dispatch({
                type: 'ROOM_ADD_ERROR',
                error,
            });
        } finally {
            dispatch({
                type: 'FEED_LOADING',
            });
        }
    };
}

export function updateLastMessage(message) {
    return async function (dispatch) {
        try {
            message.userName = (await api.getUser(message.userId)).name;
            dispatch({
                type: 'ROOMS_UPDATE_LAST_MESSAGE',
                newMessage: message
            });
        }catch (error){
            return {
                type: 'ROOM_ERROR',
                error,
            }
        }
    };
}
