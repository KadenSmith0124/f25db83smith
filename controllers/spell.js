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

// Handle Spell create on POST.
exports.spell_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Spell();

    // We expect the POST body to contain JSON like:
    // {"name":"Firebolt","level":0,"school":"Evocation","description":"A bolt of fire."}

    document.name = req.body.name;
    document.level = req.body.level;
    document.school = req.body.school;
    document.description = req.body.description;

    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
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

