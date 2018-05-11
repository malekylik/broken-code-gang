import api from '../api';
import { store } from "../index.js";

const onCreateRoom = function(room) {
    api.currentUserJoinChannel(room._id);
    
    store.dispatch({
        type: 'ROOM_ADD',
        room,
    });
}

export default onCreateRoom;
