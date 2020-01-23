const express = require('express');
const npsDB = require('../models/nps-model')
const router = express.Router();
const { restricted } = require('../middleware/auth-mw.js');


router.get('/', restricted, async (req, res) => {
    try {
        const nps = await npsDB.find();

        res.status(200).json(nps);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});


router.get('/:id', restricted, async (req, res) => {
    try {
        const {id} = req.params;
        const npsObj = await npsDB.findById(id);

        res.status(200).json(npsObj);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}); 

router.post('/', restricted, async (req, res) => {
    try {
        const newnpsObj = await npsDB.add(req.body);

        res.status(201).json(newnpsObj);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.put('/:id', restricted, async (req, res) => {
    try {
        const {id} = req.params;
        const updatenpsObj = await npsDB.update(id, req.body);

        updatenpsObj
        ? res.status(200).json({ message: 'successfully updated npsObj' })
        : res.status(404).json({ message: 'npsObj not found'})
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.delete('/:id', restricted, async (req, res) => {
    try {
        const {id} = req.params;
        const success = await npsDB.remove(id);

        success ?
         res.status(204).end() : res.status(404).end();
    }  catch(err) {
         res.status(500).json({success: false, err});
    }
});



module.exports = router;