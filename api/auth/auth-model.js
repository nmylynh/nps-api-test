const db = require('../../data/dbConfig');

module.exports = {
    register,
    login
}

function register(newUser) {
    return db('users')
    .insert(newUser)
    .returning('*')
}

function login(username) {
    return db('users')
        .where({ username })
        .first()
}