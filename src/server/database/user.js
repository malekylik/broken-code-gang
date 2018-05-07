const { ObjectId } = require('mongodb');

const { getSessionInfo, saveSessionInfo, deleteSessionInfo } = require('./session');
const { pageableCollection } = require('./helpers');

const TABLE = 'users';

/**
 * @typedef {{
 *  [_id]: string,
 *  name: string,
 *  email: string,
 *  phone: string,
 *  [status]: boolean
 * }} User
 */

/**
 * @param {Db} db
 * @param {string} sid Session ID
 *
 * @returns {Promise<User>}
 */
async function findUserBySid(db, sid) {
    const session = await getSessionInfo(db, sid);
    return getUser(db, session.userId);
}

/**
 * @param {Db} db
 * @param {string} userId
 *
 * @returns {Promise<User>}
 */
async function getUser(db, userId) {
    if (!userId){
        return null;
    }
    return db.collection(TABLE).findOne({ _id: ObjectId(userId.toString()) });
}

/**
 * @param {Db} db
 * @param {String} userId
 * @param {String} sid
 *
 * @returns {Promise<User>}
 */
async function setCurrentUser(db, { userId, sid }) {
    if (!userId) {
        throw new Error('User id required');
    }

    if (!sid) {
        throw new Error('Session id required');
    }

    await deleteSessionInfo(db, sid);
    let session = {
        userId: ObjectId(userId),
        sid: sid,
    };
    await saveSessionInfo(db, session);
    return await findUserBySid(db, sid);
}

/**
 * @param {Db} db
 * @param {String} sid
 *
 * @returns {Promise<User>}
 */
async function logoutUser(db, sid) {
    if (!sid) {
        throw new Error('Session id required');
    }

    return await deleteSessionInfo(db, sid);
}

/**
 * @param {Db} db
 * @param {{}} [filter]
 *
 * @return {Promise<Pagination<User>>}
 */
async function getUsers(db, filter) {
    return pageableCollection(db.collection(TABLE), filter);
}

/**
 * @param {Db} db
 * @param {string} email
 * @param {string} password
 *
 * @return {Promise<Message>}
 */
async function addUser(db, { email, password, name }) {
    if (!email) {
        throw new Error('User email required');
    }

    if (!password) {
        throw new Error('User password required');
    }

    if (!name) {
        throw new Error('User name required');
    }

    const userEntity = {
        email: email,
        password: password,
        name: name
    };
    const result = await db.collection(TABLE).insertOne(userEntity);
    userEntity._id = result.insertedId;

    return userEntity;
}

/**
 * @param {Db} db
 * @param {string} email
 * @param {string} password
 *
 * @return {Promise<Message>}
 */
async function addPushInfoUser(db, { _id, device, info }) {
    if (!_id) {
        throw new Error('User email required');
    }

    if (!device) {
        throw new Error('User password required');
    }

    if (!info) {
        throw new Error('User name required');
    }

    const collection = await db.collection(TABLE);
    await collection.updateOne({ _id }, { [device]: info });
}

module.exports = {
    findUserBySid,
    getUsers,
    getUser,
    addUser,
    setCurrentUser,
    logoutUser,
};
