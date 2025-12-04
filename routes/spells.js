var express = require('express');
const spell_controllers = require('../controllers/spell');
var router = express.Router();

// Authentication check function
// Redirects to login if user is not authenticated
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  // Remember where user was going
  req.session.toReturn = req.originalUrl;
  res.redirect("/login");
};

/* GET Spells page. */
router.get('/', spell_controllers.spell_view_all_Page);

/* GET detail spell page */
router.get('/detail', spell_controllers.spell_view_one_Page);

/* GET create spell page */
router.get('/create', spell_controllers.spell_create_Page);

/* GET spell update page (PROTECTED) */
router.get('/update', secured, spell_controllers.spell_update_Page);

/* GET spell delete page */
router.get('/delete', spell_controllers.spell_delete_Page);

module.exports = router;
