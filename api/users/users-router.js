const router = require('express').Router();
const Users = require('./users-model.js');
const bcrypt = require('bcryptjs');
const { validateUserBody, validateUserId } = require('./users-mw')

module.exports = router;

router.get('/', get)
router.get('/:id', getId)
router.get('/:id/nps', getNps)
router.delete('/:id', validateUserId, remove)
router.put('/:id', validateUserId, update)


async function get(req, res) {
  try {
    const { id } = req.params;
    const users = await Users.getUsers(id);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ success: false, err, msg: 'could not retrieve users' })
  }
}

async function getId(req, res) {
  try {
    const { id } = req.params;
    const user = await Users.get(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ success: false, err, msg: 'could not find user by id' })
  }
}

async function getNps(req, res) {
  try {
    const { id } = req.params;
    const userNps = await Users.getUserNps(id);

    res.status(200).json(userNps);
  } catch (err) {
    res.status(500).json({ success: false, err, msg: 'could not find user nps data' });
  }
};


async function update(req, res) {
  try {
    const { id } = req.params;
    let newUser = req.body;

    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    const updateUser = await Users.update(id, req.body);

    updateUser
      ? res.status(200).json({ message: 'successfully updated credentials' })
      : res.status(404).json({ message: 'missing required fields' })
  } catch (err) {
    res.status(500).json({ success: false, err, msg: 'could not update user' })
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const success = await Users.remove(id);

    success ?
      res.status(204).end() : res.status(404).end();
  } catch (err) {
    res.status(500).json({ success: false, err, msg: 'could not delete user' })
  }
}