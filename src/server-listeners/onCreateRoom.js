import api from '../api';
import { store } from "../index.js";


const onCreateRoom = function(room) {
    api.currentUserJoinChannel(room._id);

    const { route: { page } } = store.getState();
    
    if (page === 'chat_list') {
        store.dispatch({
            type: 'ROOM_ADD',
            room,
        });
    }
}

export default onCreateRoom;