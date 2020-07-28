const db = require('../../../database/db-config');

module.exports = {
    addUser,
    findBy,
    findById,
    removeUser,
    updateUser
}

function addUser(user) {
    return db('users').insert(user, 'id').then(ids => ({ id: ids[0] }))
}

function findBy(filter) {
    return db('users').where(filter);
}

function findById(id) {
    return db('users').where({ id })
}

function removeUser(id) {
    return db('users').where({ id }).delete();
}

function updateUser(changes, id) {
    return db('users').where({ id }).update(changes).returning('id');
}