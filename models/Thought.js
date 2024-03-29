const { Schema, model } = require('mongoose'); 
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        length: [1, 280]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => createdAtVal.toLocaleString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;