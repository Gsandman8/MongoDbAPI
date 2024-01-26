const {User, Thought} = require('../models');

const findThoughts = async (req, res) => {
    await Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        }).select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err));
};

const findThoughtById = async (req, res) => {
    await Thought.findById({ _id: req.params.id })
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(500).json(err));
    };

const createThought = async (req, res) => {
    const newThought = await Thought.create(req.body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err));
    
    await User.findOneAndUpdate(
        { _id: req.body.userId }, 
        { $push: { thoughts: newThought._id } }, 
        { new: true })
};

const updateThought = async (req, res) => {
    await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id' });
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    };

const deleteThought = async (req, res) => {
    await Thought.findOneAndDelete({ _id: req.params.id })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
    })


};

const addReaction = async (req, res) => {
    await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id' });
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
};

const deleteReaction = async (req, res) => {
    await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err));
};

module.exports = {
    findThoughts,
    findThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
};

