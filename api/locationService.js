import clientService from "../api/clientService";

const rootEndpoint = "https://ensc321.azurewebsites.net/api";

// Model class for a cocktail
export class Location {
  constructor({
    id,
    jourDebut,
    jourFin,
    materielId,
    clientId,
    materiel = {},
    client = {},
  }) {
    this.id = id;
    this.jourDebut = jourDebut;
    this.jourFin = jourFin;
    this.materielId = materielId;
    this.clientId = clientId;

    this.client = client ? clientService.toClient(client) : undefined;
    this.materiel = materiel;
  }
}

class LocationService {
  async fetchAllLocations() {
    const locations = await this.fetchFromApi(`${rootEndpoint}/LocationApi`);

    if (locations == null)
      throw Error("Impossible de recuperer la liste des elements depuis l'API");

    return this.toLocations(locations);
  }

  async findLocationById(id) {
    const location = await this.fetchFromApi(
      `${rootEndpoint}/LocationApi/${id}`
    );
    return this.toLocation(location);
  }

  async editLocationById(id, location) {
    const body = JSON.stringify({
      clientId: location.clientId,
      materialId: location.materielId,
      jourDebut: location.jourDebut,
      jourFin: location.jourFin,
    });

    const response = await fetch(`${rootEndpoint}/LocationApi/${id}`, {
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

  async deleteLocationById(id) {
    const response = await fetch(`${rootEndpoint}/LocationApi/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  }

  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);
    try {
      const response = await fetch(query);
      // FIXME: JSON parse error when ingredient is not found
      const json = await response.json();
      return json;
    } catch (e) {}
  }

  toLocation(location) {
    return new Location({
      id: location.id,
      jourDebut: location.jourDebut,
      jourFin: location.jourFin,
      materielId: location.materielId,
      clientId: location.clientId,
      materiel: location.materiel,
      client: location.client,
    });
  }

  toLocations(locations) {
    return locations.map((location) => {
      return this.toLocation(location);
    });
  }
}

const locationService = new LocationService();

export default locationService;
