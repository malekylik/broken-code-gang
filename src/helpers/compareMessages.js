export function compareMessages(a, b) {
    a = (a && a.lastMessage && a.lastMessage.created_at) || 0;
    b = (b && b.lastMessage && b.lastMessage.created_at) || 0;

    return b - a;
}
