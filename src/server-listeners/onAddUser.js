import { store } from "../index.js";
import updateLastUser from "../actions/users";

const onAddUser = function(user) {
    const state = store.getState() || {};

    const { route: { page } } = state;
    
    if (page === 'contacts_list') {
        store.dispatch(updateLastUser(user));
    }

}

export default onAddUser;
