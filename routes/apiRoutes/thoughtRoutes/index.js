const router = require('express').Router();

const { findAllThoughts, 
    findThoughtById, 
    createThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    deleteReaction } 
    = require('../../../controllers/thoughtController');

router.get('/', findAllThoughts);

router.get('/:id', findThoughtById);

router.post('/', createThought);

router.put('/:id', updateThought);

router.delete('/:id', deleteThought);

router.post('/:id/reactions', addReaction);

router.delete('/:id/reactions/:reactionId', deleteReaction);

module.exports = router;