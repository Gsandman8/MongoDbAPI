const db = require('../config/connection');
const { User, Thought } = require('../models');

const findAllUsers = async (req, res) => {
    await User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        }).populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err));
}

const findUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id' });
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
}

const createUser = async (req, res) => {
    await User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err));
}

const updateUser = async (req, res) => {
    await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id' });
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
}

const deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id })
    .then(dbUserData => {
        if (!dbUserData){
            return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
}

const findUserFriends = async (req, res) => {
    await User.findById({ _id: req.params.id })
    .then(dbUserData => {
        if (!dbUserData){
            return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(dbUserData.friends);
    })
}

const addFriend = async (req, res) => {
    
    await User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: {friends : req.params.friendId}  },
        { new: true }
    )
    .then(dbUserData => {
        if (!dbUserData){
            return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
}

const deleteFriend = async (req, res) => {
    
    await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true }
    )
    .then(dbUserData => {
        if (!dbUserData){
            return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
}

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    findUserFriends,
    addFriend,
    deleteFriend
}