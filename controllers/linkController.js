const Topic = require('../models/topic');


const linkController = {

    //CREATE: Agregar enlace al tema
    addLink: (req, res) => {
        const {topicID} = req.params;
        const data = req.body;

        const newLink = Topic.addLinks (topicID, data);
        if (!newLink){
            return res.status (404).json({error: 'No se encontro el tema'})
        }
        res.status(201).json({success: true});
    },
    
    //DELETE: Eliminar enlace del tema 
    deleteLink: (req, res) => {
        const {topicID, linkID} = req.params;
        const wasDelete = Topic.deleteLink (topicID, linkID);

        if (!wasDelete){
            return res.status(404).json({error: 'No se encontro el tema o el enlace no existe'})
        }
        res.status (200).json({success:true});
    },

    //UPDATE: Modificar un enlace 
    updateLink: (req, res) => {
        const {topicID, linkID} = req.params;
        const data = req.body;

        const wasLinkUpdate = Topic.updateLinks (topicID,linkID, data);

        if (!wasLinkUpdate){
            return res.status(404).json({error: 'Error no se encontro el tema o enlace inexistente'})
        }
        res.status(200).json({success:true});
    },

    voteLink: (req, res) => {
        const {topicID, linkID} = req.params;

        const wasVoteLink = Topic.upvoteLink (topicID, linkID);

        if (!wasVoteLink){
            return res.status(404).json({error: 'Error no se encontro el tema o enlace inexistente'})
        }
        res.status(200).json({success: true});
    }
};

module.exports = linkController;