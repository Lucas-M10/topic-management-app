const BASE_URL = '/topics';                  //base en la cual estamos trabajando 
const COMPONENT_URL = '/topics/fragment';   //Devuelve el html actualizado

// ========================
// FUNCIONES DE INTERFAZ
// ========================

//Se encarga de intercambiar la vista de edicion 
function toggleEdit (viewId, editId){
    const viewBlock = document.getElementById (viewId);
    const editBlock = document.getElementById (editId);

    if (viewBlock && editBlock ){
        viewBlock.classList.toggle (`is-hidden`);
        editBlock.classList.toggle (`is-hidden`);
    }
}

//Se encarga de actualizar la vista de los contenedores 
async function updateView() {
    const container = document.getElementById ('topics-container');

    try {
        const response = await fetch (COMPONENT_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
            }

        const html = await response.text ();

        container.innerHTML = html;

    } catch (error) {
        console.error(`Error actualizando la vista ${error}`);
    }
}


// ========================
// TOPICS
// ========================

//Se encarga de crear el tema 
async function createTopic() {
    const titleInput = document.getElementById ('new-title');
    const descriptionInput = document.getElementById ('new-description');

    const title = titleInput.value;
    const description = descriptionInput.value;

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });

        if (!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }

        //Actualizamos la vista 
        await updateView ();

        //Limpiamos el formulario
        titleInput.value = '';
        descriptionInput.value = '';

    } catch (error) {
        console.error (`Error creando el tema: ${error}`);
        alert('No se pudo crear el tema ');
    }
    
}


//Se encarga de la votacion del tema 
async function voteTopic(id) {
    await fetch(`${BASE_URL}/${id}/vote`, {
            method: 'PATCH'
        });
        
    await updateView();
    }


//borrar tema 
async function deleteTopic(id) {

    if (!confirm('Delete Topic?')){
        return;
    }

    await fetch (`${BASE_URL}/${id}`, {
        method:`DELETE`
    });

    await updateView ();
}

//Guardar Tema
async function updateTopic(id) {
    const titleInput = document.getElementById (`title-${id}`)
    const descriptionInput = document.getElementById (`desc-${id}`);

    const title = titleInput.value;
    const description = descriptionInput.value;


    await fetch (`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify ({
            title: title,
            description: description
        })
    });

    await updateView ();
}

// ========================
// LINKS
// ========================

//Agregamos los links nuevos 
async function addLink(topicID) {
    const input = document.getElementById (`new-link-${topicID}`);

    const title = input.value;

    await fetch (`${BASE_URL}/${topicID}/links`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            title:title
        })
    });

    await updateView ();
}


//Se encarga de los votos de los links 
async function voteLink(topicID, linkID) {
    
    await fetch (`${BASE_URL}/${topicID}/links/${linkID}/vote`, {
        method:'PATCH'
    });

    await updateView ();
}


//Se encarga de eliminar los links 
async function deleteLink(topicID, linkID) {
    if (!confirm('Delete link?')){
        return;
    }

    await fetch (`${BASE_URL}/${topicID}/links/${linkID}`, {
        method: 'DELETE'
    });
    
    await updateView ();
}


//Editar links
async function updateLink(topicID, linkID) {    
    const input = document.getElementById(
        `link-title-${topicID}-${linkID}`
    );

    const title = input.value;

    await fetch(`${BASE_URL}/${topicID}/links/${linkID}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        }
    );
    
    await updateView();
}