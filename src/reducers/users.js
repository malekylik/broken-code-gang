export default function users(state, action) {
    if (!state) {
        return {
            items: [],
            next: true,
        };
    }
    switch (action.type) {
    case 'USERS_FETCH':
        return {
            ...state,
            items: [...state.items, ...action.items],
            next: action.next,
            end: action.end,
        };
    case 'USER_SIGN_OUT':
        return {
            items: [],
            next: true,
        };
    case 'USERS_RESET':
        return {
            ...state,
            items: [],
            next: true,
        };
    case 'USERS_UPDATE_LAST_USER': 
        return {
            ...state,
            items: [action.newUser, ...state.items],
        };
    default:
        return state;
    }
}
