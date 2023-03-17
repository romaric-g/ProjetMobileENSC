
class Client {

    constructor({
        id, prenom = null, nom = null
    }) {
        this.id = id;
        this.prenom = prenom;
        this.nom = nom;
    }
}

class ClientService {
    createCient(client) {
        return new Client(client);
    }
}


export default new ClientService()