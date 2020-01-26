const db = require('../../data/dbConfig');
module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('nps');
}

function findById(id) {
    return db('nps')
    .where({ id })
    .first()
}

function add(nps) {
    return db('nps')
        .insert(nps, '*')
}

function update(id, changes) {
    return db('nps')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('nps')
    .where({ id })
    .del();
}