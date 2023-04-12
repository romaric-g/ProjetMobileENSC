const rootEndpoint = "https://ensc321.azurewebsites.net/api";

// Model class for a cocktail
export class Material {
  constructor({ id, nom, prixParJour, masquer, assignationPeriodes }) {
    this.id = id;
    this.nom = nom;
    this.prixParJour = prixParJour || 0;

    this.masquer = masquer || false;
    this.assignationPeriodes = assignationPeriodes || [];
  }
}

class MaterialService {
  async fetchAllMaterials() {
    const materials = await this.fetchFromApi(`${rootEndpoint}/MaterielApi`);

    console.log(materials);

    if (materials == null)
      throw Error("Impossible de recuperer la liste des elements depuis l'API");

    return this.toMaterials(materials);
  }

  async findMaterialById(id) {
    const material = await this.fetchFromApi(
      `${rootEndpoint}/MaterialApi/${id}`
    );
    return this.toMaterial(material);
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

  async createMaterial(material) {
    console.log("material", material);
    const body = JSON.stringify({
      nom: material.nom,
      prixParJour: material.prixParJour,
      masquer: material.masquer,
    });
    const response = await fetch(`${rootEndpoint}/MaterielApi`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    return await response.json();
  }

  async rentMaterial(id, clientId, start, end) {
    console.log("RENT", id, clientId, start, end);
    const body = JSON.stringify({
      clientId: clientId,
      jourDebut: start,
      jourFin: end,
    });
    console.log("BODY", body);
    const response = await fetch(`${rootEndpoint}/MaterielApi/${id}/Louer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    const ok = response.ok;
    const json = await response.json();

    console.log("RESPONSE JSON", json);
    console.log("RESPONSE OK", ok);

    return { json: await json, ok };
  }

  toMaterial(material) {
    return new Material({
      id: material.id,
      nom: material.nom,
      prixParJour: material.prixParJour || 0,
      masquer: material.masquer || false,
      assignationPeriodes: material.assignationPeriodes,
    });
  }

  toMaterials(materials) {
    return materials.map((material) => {
      return this.toMaterial(material);
    });
  }
}

const materialService = new MaterialService();

export default materialService;
