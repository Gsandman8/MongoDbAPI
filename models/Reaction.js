const { Schema, Types } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: String,
        default: new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: true,
        length: [1, 280]
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => createdAtVal.toLocaleString()
    }
});

module.exports = ReactionSchema;