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

// for a specific Spell.
exports.spell_detail = async function(req, res) {
    console.log("detail " + req.params.id);
    try {
        let result = await Spell.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found}`);
    }
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

// Handle Spell delete on DELETE.
exports.spell_delete = async function(req, res) {
    console.log("delete " + req.params.id);
    try {
        let result = await Spell.findByIdAndDelete(req.params.id);
        console.log("Removed " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": "Error deleting ${err}"}`);
    }
};

// Handle Spell update on PUT.
exports.spell_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id}`)

    try {
        let toUpdate = await Spell.findById(req.params.id);

        // Do checks for existence
        if (!toUpdate) {
            res.status(404);
            res.send(`{"error":"Spell with id ${req.params.id} not found"}`);
            return;
        }

        // Update fields only if provided in body
        if (req.body.name) toUpdate.name = req.body.name;
        if (req.body.level) toUpdate.level = req.body.level;
        if (req.body.school) toUpdate.school = req.body.school;
        if (req.body.description) toUpdate.description = req.body.description;

        let result = await toUpdate.save();
        res.send(result);

    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.spell_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id);
    try {
        let result = await Spell.findById(req.query.id);
        res.render('spelldetail', { title: 'Spell Detail', toShow: result });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a Spell.
// No body, no id, no query. Just render the page.
exports.spell_create_Page = function(req, res) {
    console.log("create view");
    try {
        res.render('spellcreate', { title: 'Spell Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a Spell.
// query provides ?id=<id>
exports.spell_update_Page = async function(req, res) {
    console.log("update view for item " + req.query.id);
    try {
        let result = await Spell.findById(req.query.id);
        res.render('spellupdate', { title: 'Spell Update', toShow: result });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
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

