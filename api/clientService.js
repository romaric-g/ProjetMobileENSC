const rootEndpoint = "https://ensc321.azurewebsites.net/api";

// Model class for a cocktail
export class Client {
  constructor({ id, nom, prenom, email, telephone, adresse }) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.telephone = telephone;
    this.adresse = adresse;
  }
}

class ClientService {
  async fetchAllClients() {
    const clients = await this.fetchFromApi(`${rootEndpoint}/ClientApi`);

    console.log(clients);
    
    if (clients == null)
      throw Error("Impossible de recuperer la liste des elements depuis l'API");

    return this.toClients(clients);
  }

  async findClientById(id) {
    const client = await this.fetchFromApi(
      `${rootEndpoint}/ClientApi/${id}`
    );
    return this.toClient(client);
  }

  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);
    try {
      const response = await fetch(query);
      // FIXME: JSON parse error when ingredient is not found
      const json = await response.json();
      console.log("json", json);
      return json;
    } catch (e) {
      console.log("error on fetching", e);
    }
  }


  async createClient(client) {

    console.log("client",client)
    const body = JSON.stringify({
    //   nom: client.nom,
    //   prixParJour: client.prixParJour,
    //   masquer: client.masquer
    })
    const response = await fetch(`${rootEndpoint}/MaterielApi`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
      body: body,
    })

    return await response.json()
  }



  toClient(client) {
    return new Client({
      id: client.id,
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      telephone: client.telephone,
      adresse: client.adresse
    })
  }

  toClients(clients) {
    return clients.map((client) => {
      return this.toClient(client);
    });
  }
}

export default new ClientService();
