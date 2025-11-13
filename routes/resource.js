var express = require('express');
var router = express.Router();

// Require controller modules
var api_controller = require('../controllers/api');
var spell_controller = require('../controllers/spell');

/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);

/// SPELL ROUTES ///
// POST request for creating a Spell
router.post('/spells', spell_controller.spell_create_post);

// DELETE request to delete Spell
router.delete('/spells/:id', spell_controller.spell_delete);

// PUT request to update Spell
router.put('/spells/:id', spell_controller.spell_update_put);

// GET request for one Spell
router.get('/spells/:id', spell_controller.spell_detail);

// GET request for list of all Spell items
router.get('/spells', spell_controller.spell_list);

module.exports = router;