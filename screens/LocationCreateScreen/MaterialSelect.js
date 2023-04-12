import React from "react";
import materialService from "../../api/materialService";
import SelectSearch from "../../components/SelectSearch";
import { Text } from "react-native";

const toMaterielDisplay = (item) => {
  if (!item) return null;
  return item["nom"];
};

const MaterialSelect = ({ material, setMaterial }) => {
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
      selectTextBuilder={(data) => "result"}
      onSelect={({ item }) => {
        setMaterial(item);
      }}
    />
  );
};

export default MaterialSelect;
