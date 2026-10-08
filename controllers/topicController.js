const Topic = require ('../models/topic');

const topicController = {

    //READ: vemos la pagina principal
    renderHome: (req, res) => {
        const topics = Topic.getAll ();

        res.render ('index', {
            titulo: 'Bienvenido a Leran It, Love it',
            mensaje: 'Plataforma colaborativa para aprender habilidades increibles',
            topics: topics

        });
    },

    getTopicsFragment: (req, res) => {
        const topics = Topic.getAll();

        res.render('partials/topic-list', { topics: topics });
    },

    //CREATE: crear un Tema
    createTopic: (req, res) => {
        const {title, description} = req.body;
        Topic.create ({title, description});

        res.status(201).json({ success: true });
    },

    //DELETE: elimina un tema
    deleteTopic: (req, res) => {

        const {id}= req.params;

        const wasDelete = Topic.delete (id);

        if (!wasDelete){
            return res.status(404).json({error: 'Tema no encontrado'});
        }
        res.json({ success: true });
    },
    
    //UPDATE: modificamos el tema 
    updateTopic: (req, res) => {
        const {id} = req.params;
        const data = req.body;

        const wastopicupdate = Topic.update (id, data);

        if (!wastopicupdate){
            return res.status(404).json({ error: 'Tema no encontrado' });
        }
        res.json({success:true});
    },


    // aumentar el voto en un tema
    voteTopic: (req, res)=> {

        const {id} = req.params;

        const wasTopicVote = Topic.upvotes (id);

        if (req.accepts ('json')){
            if (!wasTopicVote){
                return res.status (404).json ({error: 'Tema no encontrado'});
            }
            return res.json ({success: true});
        }
        res.json ({success:true});
    }   

};

module.exports = topicController;