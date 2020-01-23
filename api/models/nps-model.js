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

async function add(role) {
    const [id] = await db('nps').insert(role);

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