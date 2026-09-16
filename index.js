// 1. Importamos la libreria
const express = require ('express');

// 2. Inicializamos la aplicacion
const app = express ();

// Le indicamos a Express que usaremos EJS como motor de plantillas 
app.set ('view engine', 'ejs')

// Permite que se pueda interpretar los datos enviados desde el html.
app.use (express.urlencoded ({extended: true}));

//3. Definimos el puerto de red
const PORT = 3000;

// Importamos el Modelo que contiene los datos y el metodo getAll ()
const Topic = require ('./models/topic');


// Configuramos la carpeta de archivos estaticos
app.use (express.static ('public'));

//4. Definimos nuestra primera ruta donde escuchara el servidor 
app.get ('/', (req, res) => {

    const topics = Topic.getAll ();

    res.render ('index',
        {
            titulo: 'Bienvenido a Leran It, Love it',
            mensaje: 'Plataforma colaborativa para aprender habilidades increibles',
            topics: topics
        });
});

// Definimos la ruta donde enviara los datos el formulario al servidor 
app.post ('/topics', (req, res) => {
    // Extraemos los campos que el usuario escribio en el formato
    const {title, description} = req.body;

    // Le pedimos al modelo que cree el nuevo tema 
    Topic.create ({title, description});

    // Redirigimos al usuario a la pagina principal
    res.redirect ('/');
});

// Ruta para poder votar los temas 
app.post ('/topics/:id/vote', (req, res) => {

    // Extraemos el id dinamico desde los parametros de la URL
    const {id} = req.params;

    // Le pedimos al modelo que incremente el contador de votos 
    Topic.upvotes (id);

    // Redirigimos a la pagina principal para refrescar la lista y el orden
    res.redirect ('/');

});

// Ruta para eliminar un tema especifico 
app.post ('/topics/:id/delete', (req, res) => {
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
app.post ('/topics/:topicID/links/:linkID/vote', (req, res) => {
    const {topicID, linkID} = req.params;

    const updateLink = Topic.upvoteLink (topicID, linkID);

    if (!updateLink) {
        console.warn (`No se pudo votar: Tema ${topicID} o link ${linkID} no encontrados`);
    }

    res.redirect ('/');
});

// Ruta que se encarga de eliminar los links asociados a los temas 
app.post ('/topics/:topicID/links/:linkID/delete', (req, res) => {
    const {topicID, linkID} = req.params;

    const delLink = Topic.deleteLink (topicID, linkID);

    if (!delLink){
        console.warn (`No se pudo elimianr: Tema ${topicID} o link ${linkID} no encontrados`);
    }

    res.redirect ('/');
});

//Ruta para agregar un nuevo recurso a un tema especifico 
app.post ('/topics/:topicID/links', (req, res) => {
    const topicID = req.params.topicID;
    const data = req.body ;

    const newLink = Topic.addLinks(topicID, data);

    if (!newLink){
        console.warn (`No se pudo agregar el recurso: tema ${topicID} no encontrado`);
    }

    res.redirect ('/');
});


app.get('/topics/:topicID/edit', (req, res)=> {

    const topicID = req.params.topicID;
    const topic = Topic.getById (topicID);

    if (!topic){
        console.warn (
            `Intento de edicion fallido: ${topicID} no encontrado`
        );

        return res.redirect('/')
        
    }

    res.render ('edit', {topic});
});

app.post ('/topics/:topicID/edit', (req, res) => {
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

//5. Ponemos el servidor a escuchar peticiones
app.listen (PORT, () => {
    console.log (`Servidor activo y escuchando en http://localhost:${PORT}`);
});
