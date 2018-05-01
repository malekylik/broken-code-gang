import { addMessage } from '../actions/messages';
import { updateLastMessage } from '../actions/rooms';
import createBrowserNotification from './createBrowserNotification';
import api from '../api';

const onMessage = function(message) {
    this.props.dispatch(updateLastMessage(message));
    
    // if(this.props.payload.currentRoom === message.roomId){
    //     this.props.dispatch(addMessage(message));
    // }

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
