const updateLastUser = (user) => ({
    type: 'USERS_UPDATE_LAST_USER',
    newUsers: user,
});

export default updateLastUser;