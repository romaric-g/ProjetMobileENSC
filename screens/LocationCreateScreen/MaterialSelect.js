import React from "react";
import materialService from "../../api/materialService";
import SelectSearch from "../../components/SelectSearch";
import { Text } from "react-native";

const toMaterielDisplay = (item) => {
  if (!item) return null;
  return item["nom"];
};

const MaterialSelect = ({ material, setMaterial, error }) => {
  return (
    <SelectSearch
      label="Materiel"
      value={
        material ? toMaterielDisplay(material) : "Aucun materiel sélectionné"
      }
      fetchData={async () => {
        return await materialService.fetchAllMaterials();
      }}
      toText={({ item }) => {
        return toMaterielDisplay(item);
      }}
      keyExtractor={(data) => {
        return data["id"];
      }}
      onSelect={({ item }) => {
        setMaterial(item);
      }}
      error={error}
    />
  );
};

export default MaterialSelect;
