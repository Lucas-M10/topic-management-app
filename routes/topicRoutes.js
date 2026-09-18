//Importamos la libreria y creamos el router
const express = require ('express');
const router = express.Router();

//Importamos el modelo que interactua con los datos 
const Topic = require ('../models/topic');


// Definimos nuestra primera ruta donde escuchara el servidor 
router.get ('/', (req, res) => {

    const topics = Topic.getAll ();

    res.render ('index',
        {
            titulo: 'Bienvenido a Leran It, Love it',
            mensaje: 'Plataforma colaborativa para aprender habilidades increibles',
            topics: topics
        });
});

// Definimos la ruta donde enviara los datos el formulario al servidor 
router.post ('/topics', (req, res) => {
    // Extraemos los campos que el usuario escribio en el formato
    const {title, description} = req.body;

    // Le pedimos al modelo que cree el nuevo tema 
    Topic.create ({title, description});

    // Redirigimos al usuario a la pagina principal
    res.redirect ('/');
});

// Ruta para poder votar los temas 
router.post ('/topics/:id/vote', (req, res) => {

    // Extraemos el id dinamico desde los parametros de la URL
    const {id} = req.params;

    // Le pedimos al modelo que incremente el contador de votos 
    Topic.upvotes (id);

    // Redirigimos a la pagina principal para refrescar la lista y el orden
    res.redirect ('/');

});

// Ruta para eliminar un tema especifico 
router.post ('/topics/:id/delete', (req, res) => {
    const topicID = req.params.id;

    const wasDelete = Topic.delete (topicID);

    if (!wasDelete){
        console.warn (
            `Intendo de eliminar un tema inexistente con ID: ${topicID}`
        )
    }

    //Redirigimos al inicio para ver la lista fresca
    res.redirect ('/');
});

//Ruta para poder aumentar el voto de un link asociado a un tema 
router.post ('/topics/:topicID/links/:linkID/vote', (req, res) => {
    const {topicID, linkID} = req.params;

    const updateLink = Topic.upvoteLink (topicID, linkID);

    if (!updateLink) {
        console.warn (`No se pudo votar: Tema ${topicID} o link ${linkID} no encontrados`);
    }

    res.redirect ('/');
});

// Ruta que se encarga de eliminar los links asociados a los temas 
router.post ('/topics/:topicID/links/:linkID/delete', (req, res) => {
    const {topicID, linkID} = req.params;

    const delLink = Topic.deleteLink (topicID, linkID);

    if (!delLink){
        console.warn (`No se pudo elimianr: Tema ${topicID} o link ${linkID} no encontrados`);
    }

    res.redirect ('/');
});

//Ruta para agregar un nuevo recurso a un tema especifico 
router.post ('/topics/:topicID/links', (req, res) => {
    const topicID = req.params.topicID;
    const data = req.body ;

    const newLink = Topic.addLinks(topicID, data);

    if (!newLink){
        console.warn (`No se pudo agregar el recurso: tema ${topicID} no encontrado`);
    }

    res.redirect ('/');
});

//Ruta que se encarga de editar el tema
router.post ('/topics/:topicID/edit', (req, res) => {
    const {topicID} = req.params;
    const data = req.body;

    const updateTopic = Topic.update (topicID, data);

    if(!updateTopic){
        console.warn (
            `No se pudo actualizar el recurso: Id: ${topicID} no encontrado`
        );
    }
    res.redirect ('/')
});


module.exports = router;