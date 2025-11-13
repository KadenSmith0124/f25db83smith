var express = require('express');
const spell_controllers = require('../controllers/spell');
var router = express.Router();

/* GET Spells page. */
router.get('/', spell_controllers.spell_view_all_Page);

module.exports = router;
