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

async function add(nps) {
    const [id] = await db('nps').insert(nps);

    return findById(id);
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