const { 
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    findUserFriends,
    addFriend,
    deleteFriend
 } = require('../../../controllers/userController');

const router = require('express').Router();

router.get('/', findAllUsers);

router.get('/:id', findUserById);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/:id/friends', findUserFriends);

router.post('/:id/friends/:friendId', addFriend);

router.delete('/:id/friends/:friendId', deleteFriend);

module.exports = router;