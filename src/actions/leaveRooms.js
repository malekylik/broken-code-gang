import api from '../api';

export default function leaveRooms() {
    return async function (dispatch, getState) {
        try {
            const room = await api.getCurrentUserRooms(getState().rooms.next);

            const { items } = room;
            
            for(let item of items){
                await  api.currentUserLeaveChannel(item._id);
            }

        } catch (error) {
            console.log(error);
        }
    };
}
