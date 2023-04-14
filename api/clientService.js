const rootEndpoint = "https://ensc321.azurewebsites.net/api";

// Model class for a cocktail
export class Client {
  constructor({ id, nom, prenom, email, telephone, adresse, locations = [] }) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.telephone = telephone;
    this.adresse = adresse;
    this.locations = locations;
  }
}

class ClientService {
  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);
    try {
      const response = await fetch(query);

      const ok = await response.ok;
      const json = await response.json();

      return { json, ok };
    } catch (e) {
      console.log("error on fetching", e);
    }
  }

  async fetchAllClients() {
    const { json, ok } = await this.fetchFromApi(`${rootEndpoint}/ClientApi`);

    if (json == null || !ok) {
      throw Error("Impossible de recuperer la liste des elements depuis l'API");
    }

    return this.toClients(json);
  }

  async findClientById(id) {
    const { json, ok } = await this.fetchFromApi(
      `${rootEndpoint}/ClientApi/${id}`
    );

    if (json == null || !ok) {
      throw Error(`Impossible de recuperer le client ${id}`);
    }

    return this.toClient(json);
  }

  async postClient(client) {
    const body = JSON.stringify({
      nom: client.nom,
      prenom: client.prenom,
      telephone: client.telephone,
      email: client.email,
      adresse: client.adresse,
    });
    const response = await fetch(`${rootEndpoint}/ClientApi`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    return await response.json();
  }

  async editClientById(id, client) {
    const body = JSON.stringify({
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      telephone: client.telephone,
      adresse: client.adresse,
    });
    const response = await fetch(`${rootEndpoint}/MaterielApi/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    const ok = response.ok;

    return ok;
  }

  async deleteClientById(id) {
    const response = await fetch(`${rootEndpoint}/ClientApi/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  }

  toClient(client) {
    return new Client({
      id: client.id,
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      telephone: client.telephone,
      adresse: client.adresse,
      locations: client.locations,
    });
  }

  toClients(clients) {
    return clients.map((client) => {
      return this.toClient(client);
    });
  }
}

export default new ClientService();
