const rootEndpoint = "https://localhost:5128/api";

// Model class for a cocktail
export class Location {
  constructor(id, jourDebut, jourFin, materielId, clientId, materiel=null, client=null) {
    this.id = id;
    this.jourDebut = jourDebut;
    this.jourFin = jourFin;
    this.materielId = materielId
    this.clientId = clientId
    this.materiel = materiel;
    this.client = client
  }
}

class LocationService {
  async fetchAllLocations() {
    const locations = await this.fetchFromApi(
      `${rootEndpoint}/LocationApi`
    );
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
      const content = await response.json();
      return content.drinks;
    } catch (e) {
      console.error(e);
    }
  }

  // Create a Cocktail model object from a subset of data fields returned by API
  createLocation(location) {
    return new Location(
      location.id,
      location.jourDebut,
      location.jourFin,
      location.materielId,
      location.materiel,
      location.client
    );
  }

  // Create a Cocktail model object list from the array returned by API
  createLocations(locations) {
    // Create a cocktail object for each element in the array
    return locations.map((location) => this.createLocation(location));
  }
}

export default new LocationService();