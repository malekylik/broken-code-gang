export function compareMessages(a, b) {
    a = a && a.lastMessage && a.lastMessage.created_at;
    b = b && b.lastMessage && b.lastMessage.created_at;

    return b - a;
}
