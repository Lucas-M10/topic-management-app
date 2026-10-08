// Importamos la libreria
const express = require ('express');

// Inicializamos la aplicacion
const app = express ();

// Le indicamos a Express que usaremos EJS como motor de plantillas 
app.set ('view engine', 'ejs')

// Permite que se pueda interpretar los datos enviados desde el html.
app.use (express.urlencoded ({extended: true}));
app.use (express.json ());

//3. Definimos el puerto de red
const PORT = 3000;

// Configuramos la carpeta de archivos estaticos
app.use (express.static ('public'));

//Importamos y montamos el enrutador
const topicRoutes = require ('./routes/topicRoutes');
app.use ('/', topicRoutes)

//5. Ponemos el servidor a escuchar peticiones
app.listen (PORT, () => {
    console.log (`Servidor activo y escuchando en http://localhost:${PORT}`);
});
