// 1. Importamos la libreria
const express = require ('express');

// 2. Inicializamos la aplicacion
const app = express ();

//3. Definimos el puerto de red
const PORT = 3000;

// Le indicamos a Express que usaremos EJS como motor de plantillas 
app.set ('view engine', 'ejs')

//4. Definimos nuestra primera ruta donde escuchara el servidor 
app.get ('/', (req, res) => {
    res.render ('index: ',
        {
            titulo: 'Bienvenido a Leran It, Love it',
            mensaje: 'Plataforma colaborativa para aprender habilidades increibles'
        });
});

//5. Ponemos el servidor a escuchar peticiones
app.listen (PORT, () => {
    console.log ('Servidor activo y escuchando en http://localhost:${PORT}');
});
