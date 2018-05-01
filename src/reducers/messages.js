const DEFAULT_MESSAGES = [];

const messages = (state, action) => {
    if (!state) {
        return {
            items: DEFAULT_MESSAGES,
            next:true,
            loading: true
        };
    }

    switch (action.type) {
        case 'MESSAGE_ADD':
            return {
                ...state,
                items: [...state.items, action.message]
            };

    case 'MESSAGE_REMOVE':
        return false;

    case 'MESSAGE_READ':
        return false;

    case 'MESSAGE_SEND_ERROR':
        return {
            ...state,
            error: action.error
        };

    case 'MESSAGE_SENDING':
        return state;

    case 'MESSAGES_LOADING':
        return {
            ...state,
            loading: action.loading
        };
    case 'MESSAGES_LOADED':
        return {
            ...state,
            ...action.messages,
            items: action.messages.items.reverse().slice(0).concat(state.items)
        };
    case 'MESSAGES_RELOAD':
        return {
            ...state,
            next:true,
            items:[]
        };
    case 'MESSAGE_LOAD_ERROR':
        return {
            ...state,
            error: action.error
        };
    case 'USER_SIGN_OUT':
        return {
            items: DEFAULT_MESSAGES,
            next:true,
            loading: true
        };
    default:
        return state;
    }
};

export default messages;
