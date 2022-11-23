const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    terms: [{type: Types.ObjectId, ref: 'Term'}]
});

module.exports = model('User', schema);