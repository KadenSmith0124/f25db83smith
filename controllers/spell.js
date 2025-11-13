var Spell = require('../models/spell');

// List of all Spells
exports.spell_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Spell list');
};

// For a specific Spell
exports.spell_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Spell detail: ' + req.params.id);
};

// Handle Spell create on POST
exports.spell_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Spell create POST');
};

// Handle Spell delete on DELETE
exports.spell_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Spell delete DELETE ' + req.params.id);
};

// Handle Spell update on PUT
exports.spell_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Spell update PUT ' + req.params.id);
};
