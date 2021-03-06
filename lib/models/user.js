const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    followed: {
        type: Number,
        default: 0
    },
    patchId: [{
        type: Schema.Types.ObjectId,
        ref: 'Patch',
    }],
    followingId: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    favoriteId: [{
        type: Schema.Types.ObjectId,
        ref: 'Patch',
    }]
});
schema.methods.generateHash = function(password) {
    return this.password = bcrypt.hashSync(password, 8);
};

schema.methods.compareHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);