import React from "react";
import clientService from "../../api/clientService";
import SelectSearch from "../../components/SelectSearch";

const toClientDisplay = (item) => {
  if (!item) return null;
  return item["prenom"] + " " + item["nom"];
};

const ClientSelect = ({ client, setClient, error }) => {
  return (
    <SelectSearch
      label="Locataire"
      value={client ? toClientDisplay(client) : "Aucun client sélectionné"}
      fetchData={async () => {
        return await clientService.fetchAllClients();
      }}
      toText={({ item }) => {
        return toClientDisplay(item);
      }}
      keyExtractor={(data) => {
        return data["id"];
      }}
      onSelect={({ item }) => {
        setClient(item);
      }}
      error={error}
    />
  );
};

export default ClientSelect;
