const mongoose = require("mongoose")

const spellSchema = mongoose.Schema({
    name: String,
    level: {
        type: Number,
        min: 0,
        max: 9
    },
    school: String,
    description: String
})

module.exports = mongoose.model("Spell", spellSchema)