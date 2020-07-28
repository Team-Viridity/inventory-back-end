const db = require('../../../database/db-config');

module.exports = {
    addUser,
    findBy,
    removeUser,
    updateUser
}

function addUser(user) {
    return db('users').insert(user, 'id').then(ids => ({ id: ids[0] }))
}

function findBy(filter) {
    return db('users').where(filter);
}

function removeUser(id) {
    return db('users').where({ id }).delete();
}

function updateUser(changes, id) {
    return db('users').where({ id }).update(changes).returning('id');
}