# Learn It, Love It — App de gestión de temas de aprendizaje

Aplicación web para crear, editar y eliminar **temas de aprendizaje** (por ejemplo, "Cómo programar como un ninja") y agregar **enlaces** dentro de cada tema. Los usuarios pueden **votar** temas y enlaces, y el contenido se reordena automáticamente de mayor a menor cantidad de votos, sin recargar la página.

Proyecto del **Challenge 8** de Penguin Academy / The Huddle.

## Tecnologías

- **Node.js** + **Express**: servidor y rutas HTTP.
- **EJS**: motor de plantillas, con partials anidados.
- **JavaScript puro** (sin frameworks ni librerías) en el navegador, usando `fetch()`.
- **CSS** escrito a mano.
- Arquitectura **MVC** (Modelo - Vista - Controlador).

## Funcionalidades

- CRUD de temas: crear, ver, editar y eliminar.
- CRUD de enlaces dentro de cada tema: agregar, ver, editar y eliminar.
- Votos para temas y enlaces.
- Reordenamiento automático por votos. Si dos elementos empatan, queda arriba el que llegó primero a ese puntaje.
- Actualización de la interfaz sin recargar la página.

## Cómo ejecutarlo

Requisito: tener [Node.js](https://nodejs.org/) instalado.

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd <carpeta-del-proyecto>

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
node index.js
```

Luego abrí `http://localhost:3000` en el navegador.

## Estructura del proyecto

```
├── index.js                  # Configura Express y monta las rutas
├── models/
│   └── topic.js              # Modelo: datos y reglas (temas, enlaces, votos)
├── controllers/
│   ├── topicController.js    # Lógica de cada ruta de temas
│   └── linkController.js     # Lógica de cada ruta de enlaces
├── routes/
│   └── topicRoutes.js        # Asocia cada URL + método HTTP con un controlador
├── views/
│   ├── index.ejs             # Página principal
│   └── partials/
│       ├── topic-list.ejs    # Recorre los temas
│       ├── topic-item.ejs    # Un tema (vista y edición)
│       ├── link-list.ejs     # Recorre los enlaces de un tema
│       └── link-item.ejs     # Un enlace (vista y edición)
└── public/
    ├── style.css             # Estilos
    └── js/
        └── client.js         # Acciones del cliente con fetch()
```

### Responsabilidad de cada capa

- **Modelo** (`models/topic.js`): guarda los temas y enlaces en memoria y ofrece los métodos para crear, leer, actualizar, eliminar y votar. No conoce HTTP ni HTML.
- **Vista** (`views/`): plantillas EJS que convierten los datos en HTML. Se dividen en partials para que cada archivo tenga una sola responsabilidad.
- **Controlador** (`controllers/`): recibe la petición, le pide al Modelo que haga el trabajo y responde en JSON (o con el HTML de la lista).

## Cómo funciona la actualización en tiempo real

1. El usuario hace clic en un botón (por ejemplo, "Vote").
2. `client.js` envía la petición al servidor con `fetch()`, sin recargar la página.
3. El servidor actualiza los datos y responde en JSON.
4. `client.js` pide el fragmento HTML de la lista (`GET /topics/fragment`), que el servidor renderiza con el partial `topic-list.ejs` y ya ordenado por votos.
5. El contenido de `#topics-container` se reemplaza con ese HTML.

Así el reordenamiento lo hace siempre el servidor, y el cliente solo reemplaza el contenedor.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Página principal |
| GET | `/topics/fragment` | HTML de la lista de temas, ordenada por votos |
| POST | `/topics` | Crear un tema (`title`, `description`) |
| PATCH | `/topics/:id` | Editar un tema |
| DELETE | `/topics/:id` | Eliminar un tema |
| PATCH | `/topics/:id/vote` | Votar un tema |
| POST | `/topics/:topicID/links` | Agregar un enlace a un tema (`title`) |
| PATCH | `/topics/:topicID/links/:linkID` | Editar un enlace |
| DELETE | `/topics/:topicID/links/:linkID` | Eliminar un enlace |
| PATCH | `/topics/:topicID/links/:linkID/vote` | Votar un enlace |

Las rutas de acciones responden con JSON (`{ "success": true }`) o, si no encuentran el recurso, con un `404` y un mensaje `{ "error": "..." }`.

## Decisiones de diseño

- **Verbos HTTP reales** (`PATCH`, `DELETE`): como todas las acciones se hacen con `fetch()`, no hay que simular la acción dentro de la URL como pasaría con formularios HTML.
- **Modelo anidado**: cada tema guarda sus enlaces dentro de `links`, lo que simplifica la lectura y el ordenamiento.
- **Partials anidados** (`topic-list` → `topic-item` → `link-list` → `link-item`): cada archivo se puede entender por separado.
- **Fragmento renderizado en el servidor**: evita reordenar elementos del DOM a mano en el cliente.
- **Desempate por `votedAt`**: guarda cuándo se votó por última vez cada elemento para que un empate no mueva al recién votado por encima del otro.

## Limitaciones conocidas

- Los datos se guardan **en memoria**: al reiniciar el servidor se pierden los cambios y vuelven los datos de ejemplo.
- No hay autenticación: cualquier persona puede crear, editar o eliminar.
- El servidor no valida el contenido de los campos; solo el atributo `required` del HTML lo hace en el navegador.
- Los enlaces se guardan como texto (`title`) y no como una URL clicable.
- El manejo de errores en el cliente es mínimo.

## Posibles mejoras

- Persistir los datos en un archivo JSON o en una base de datos.
- Agregar validaciones en cliente y servidor.
- Guardar una URL real en cada enlace.
- Agregar autenticación de usuarios.
- Estilizar con Tailwind CSS.