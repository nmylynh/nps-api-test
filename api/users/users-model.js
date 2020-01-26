const db = require('../../data/dbConfig');

module.exports = {
    get,
    remove,
    update,
    getUserNps,
    getUsers
}

function getUsers() {
    let users = db('users');

    let newUsersArray = users.map(user => {

        return this.get(user.id)
    })

    return newUsersArray
}

function get(id) {
    let users = db('users');

    if (id) {
        users.where({ id }).first();

        const promises = [users, this.getUserNps(id)];

        return Promise.all(promises).then(results => {
            let [user, nps] = results;

            if (user) {
                user.nps = nps;

                return user
            } else {
                return null;
            }
        });
    }

    return users
}

function getUserNps(id) {
    let query = db('nps')
        .where('user_id', id)
           
    return query
}

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes, '*')
}

function remove(id) {
    return db('users')
        .where({ id })
        .del();
}