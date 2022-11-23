const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    description: {type: String, required: true},
    term: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now()},
    owner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Term', schema);