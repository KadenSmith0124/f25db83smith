var Spell = require('../models/spell');

// List of all Spells
exports.spell_list = async function(req, res) {
    try {
        const spells = await Spell.find();
        res.send(spells);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
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

// VIEWS
// Handle a show-all view
exports.spell_view_all_Page = async function(req, res) {
    try {
        const allSpells = await Spell.find();
        res.render('spells', { title: 'Spell Search Results', results: allSpells });
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

