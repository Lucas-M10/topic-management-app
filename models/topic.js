// Estructura de datos en memoria paa almacenar los tmeas 
let topics = [
    {
        id:1,
        title:"Como progamar como un ninja",
        description:"Aprende los fundamentos de JavaScript y Node.js desde cero.",
        votes: 5,
        links:[
            {
                id:101,
                title: "Documento oficial de Nodes.js",
                votes: 2
            }
        ]
    },
    {
        id:2,
        title: "Dominar el arte de prepar cafe",
        description: "Guia pactica para el preparado de cafe ",
        votes: 3,
        links: []
    }
];

class Topic {
    
    //Retorna todos los temas ordenados de mayor a menor segun los votos 
    static getAll (){
        return [...topics]
        .sort ((item_a, item_b)=> item_b.votes - item_a.votes)
        .map (topic => {
            return {
                ...topic,
                links: topic.links// condicion
                ? [...topic.links].sort((linkA, linkB)=> linkB.votes - linkA.votes)//valor si es verdadero
                : [] //valor si es falso
            };
        });
    }
    
    //Metodo donde creamos los temas 
    static create ({title, description}){
        const newTopic = {
            id:Date.now (),
            title,
            description,
            votes: 0,
            links: []
        };

        topics.push (newTopic);
        return newTopic;
    }

    //Metodo que aumenta el voto 
    static upvotes (id){
        const topic = topics.find (t => t.id === Number (id));
        if (topic){
            topic.votes +=1;
            return topic;
        }
        return null;
    }

    //Metodo que elimina un tema mediante el id recibido
    static delete (id){
        const index = topics.findIndex (t => t.id === Number (id));
        if (index == -1){
            return false; //El tema no existe 
        }
        topics.splice (index, 1); //Quita un elemento en esa posicion
        return true;
    }

    //Se encarga de aumentar los votos asociados a un tema
    static upvoteLink (topicID, linkID){
        const topic = topics.find (t => t.id === Number(topicID));
        if (!topic || !topic.links){
            return null;
        }

        const link = topic.links.find (l => l.id ===Number (linkID));
        if (!link){
            return null;
        }
        link.votes +=1;
        return link;
    }

    // Se encarga de eliminar los links asociados a un tema 
    static deleteLink (topicID, linkID){
        const topic = topics.find (t => t.id === Number (topicID));
        if (!topic || !topic.links ){
            return false;
        }

        const linkIndex = topic.links.findIndex (l => l.id === Number (linkID));
        if (linkIndex === -1){
            return false;
        }
        topic.links.splice (linkIndex, 1);
        return true;
    }

    //Se encarga de agregar los enlaces a un tema especifico 
    static addLinks (topicID, { title }){
        const topic = topics.find (t => t.id === Number(topicID));

        if (!topic){
            return null;
        }

        if (!topic.links){
            topic.links = [];
        }

        const newLink = {
            id: Date.now (),
            title,
            votes: 0
        };

        topic.links.push (newLink);
        return newLink;
    }

    //Se encarga de modificar los temas 
    static update (topicID, {title, description}){
        const topic = topics.find (t => t.id === Number (topicID));

        if (!topic){
            return null;
        }

        //Actualizamos solo si envian datos validos
        if (title !== undefined) topic.title = title;
        if (description !== undefined) topic.description = description;

        return topic;
    }
}


// Exportamos la clase para que pueda ser utilizada en los controladores
module.exports = Topic;
