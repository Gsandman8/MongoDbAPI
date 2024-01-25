const router = require('express').Router();

const { findThoughts, 
    findThoughtById, 
    createThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    deleteReaction } 
    = require('../../../controllers/thoughtControllers');

router.get('/', findThoughts);

router.get('/:id', findThoughtById);

router.post('/', createThought);

router.put('/:id', updateThought);

router.delete('/:id', deleteThought);

router.post('/:id/reactions', addReaction);

router.delete('/:id/reactions/:reactionId', deleteReaction);

module.exports = router;