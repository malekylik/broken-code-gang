import { updateLastChat } from '../actions/rooms';
import { store } from "../index.js";

const onCreateRoom = function(room) {
    store.dispatch(updateLastChat(room));
}

export default onCreateRoom;