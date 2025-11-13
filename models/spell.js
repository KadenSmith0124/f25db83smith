const mongoose = require("mongoose")

const spellSchema = mongoose.Schema({
    name: String,
    level: Number,
    school: String,
    description: String
})

module.exports = mongoose.model("Spell", spellSchema)