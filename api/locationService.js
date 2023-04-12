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

    console.log("client", client);

    this.client = clientService.toClient(client);
    this.materiel = materiel;
  }
}

class LocationService {
  async fetchAllLocations() {
    const locations = await this.fetchFromApi(`${rootEndpoint}/LocationApi`);

    if (locations == null)
      throw Error("Impossible de recuperer la liste des elements depuis l'API");

    return this.createLocations(locations);
  }

  async findLocationById(id) {
    const location = await this.fetchFromApi(
      `${rootEndpoint}/LocationApi/${id}`
    );
    return this.createLocation(location);
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

  // Create a Cocktail model object from a subset of data fields returned by API
  createLocation(location) {
    return new Location({
      id: location.id,
      jourDebut: location.jourDebut,
      jourFin: location.jourFin,
      materielId: location.materielId,
      clientId: location.clientId,
      materiel: location.client,
      client: location.client,
    });
  }

  // Create a Cocktail model object list from the array returned by API
  createLocations(locations) {
    return locations.map((location) => {
      return this.createLocation(location);
    });
  }
}

const locationService = new LocationService();

export default locationService;
