import "moment/locale/fr";
import moment from "moment/moment";
import React from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SelectSearchModal from "./SelectSearchModal";

moment.locale("fr");

/**
 * Permet de selectionner un item parmis une liste.
 * Le composant integer une bar de recherche
 */

const SelectSearch = ({
  label, // Label affiché sur le composant ainsi que dans le titre de la modale
  value, // Valeur actuelle du champ
  fetchData, // Function qui est chargé de récupérer la liste des choix possibles
  toText, // Function chargé de transformé un objet choix en texte
  keyExtractor, // Function chargé de retourné la clé d'un objet choix
  onSelect, // Function activé quand l'utilisateur choisit un item parmis la liste dans la modale
  error, // Erreur affiché, si le champ n'est pas en erreur, ne pas saisir ce champ
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [errorShow, setErrorShow] = React.useState(false);

  const handleCloseModal = React.useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  // Si l'erreur change, on réaffiche re-rend visible l'erreur
  React.useEffect(() => {
    if (error) {
      setErrorShow(true);
    }
  }, [error]);

  // Un changement de la valeur retire l'affichage de l'erreur
  React.useEffect(() => {
    setErrorShow(false);
  }, [value]);

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: "white",
          borderColor: "black",
          marginTop: 2,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{label}</Text>
        {errorShow ? (
          <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
        ) : (
          <Text style={{ fontSize: 16 }}>{value}</Text>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {/* Permet d'afficher la modale en fullscreen en gardant la zone de sécurité */}
        <SafeAreaProvider style={{ backgroundColor: "white" }}>
          <SafeAreaView>
            <SelectSearchModal
              label={label}
              fetchData={fetchData}
              toText={toText}
              keyExtractor={keyExtractor}
              closeModal={handleCloseModal}
              onSelect={onSelect}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </TouchableOpacity>
  );
};

export default SelectSearch;
