const express = require ('express');
const router = express.Router();

const TopicController = require ('../controllers/topicController');
const LinkController = require ('../controllers/linkController');


// Rutas de TOPICS
router.get ('/', TopicController.renderHome);
router.get ('/topics/fragment', TopicController.getTopicsFragment);
router.post ('/topics', TopicController.createTopic);
router.patch ('/topics/:id/vote', TopicController.voteTopic);
router.delete ('/topics/:id', TopicController.deleteTopic);
router.patch ('/topics/:id', TopicController.updateTopic);


// Rutas de LINKS
router.post ('/topics/:topicID/links', LinkController.addLink);
router.patch ('/topics/:topicID/links/:linkID/vote', LinkController.voteLink);
router.delete ('/topics/:topicID/links/:linkID', LinkController.deleteLink);
router.patch ('/topics/:topicID/links/:linkID', LinkController.updateLink);

module.exports = router;