import { addMessage } from '../actions/messages';
import { updateLastMessage } from '../actions/rooms';
import createBrowserNotification from '../helpers/createBrowserNotification';
import api from '../api';
import { store } from "../index.js";

const onMessage = function(message) {
    store.dispatch(updateLastMessage(message));
    const state = store.getState() || {};

    const { route: { page } } = state;
    
    if (page === 'chat_page') {
        const { route: { payload: { currentRoom } } } = state;
        if (currentRoom === message.roomId) {
            store.dispatch(addMessage(message));
        }
    }

    if ((Notification.permission === "granted")) {
        const { roomId, userId, message: messageText } = message;

        Promise.all([api.getUser(userId), api.getRoom(roomId)]).then((result) => {
            const [{ name: userName }, { name: roomName }] = result;

            createBrowserNotification(
                roomName,
                `${userName}: ${messageText}`,
            );
        });
    }
}

export default onMessage;
