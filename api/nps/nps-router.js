const router = require('express').Router();
const Nps = require('./nps-model')


module.exports = router;

router.get('/', get)
router.get('/:id', getById);
router.post('/', add);
router.put('/:id', update);
router.delete('/:id', remove);


async function get(req, res) {
    try {
        const nps = await Nps.find();

        res.status(200).json(nps);
    } catch (err) {
        res.status(500).json({ success: false, err, msg: 'Failed to retrieve the Nps database' });
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params;
        const nps = await Nps.findById(id);

        res.status(200).json(nps);
    } catch (err) {
        res.status(500).json({ success: false, err, msg: 'Failed to retrieve the specified nps' });
    }
}

async function add(req, res) {
    try {
        const newNps = await Nps.add(req.body);

        res.status(201).json(newNps);
    } catch (err) {
        res.status(500).json({ success: false, err, msg: 'Failed to add the nps.' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const success = await Nps.update(id, req.body);

        success
            ? res.status(200).json({ message: 'successfully updated nps' })
            : res.status(404).json({ message: 'nps not found' })
    } catch (err) {
        res.status(500).json({ success: false, err, msg: 'Failed to update the nps.' });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const success = await Nps.remove(id);

        success ?
            res.status(204).end() : res.status(404).end();
    } catch (err) {
        res.status(500).json({ success: false, err, msg: 'Failed to delete the nps.' });
    }
}
