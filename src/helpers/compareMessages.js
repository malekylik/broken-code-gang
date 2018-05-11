export function compareMessages(a, b) {
    a = (a && a.lastMessage && a.lastMessage.created_at) || Number.MAX_SAFE_INTEGER;
    b = (b && b.lastMessage && b.lastMessage.created_at) || Number.MAX_SAFE_INTEGER;

    return b - a;
}
