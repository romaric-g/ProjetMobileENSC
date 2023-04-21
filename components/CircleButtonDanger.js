import React from "react";
import CircleButton from "./CircleButton";
import { Alert } from "react-native";

/**
 * Bouton de forme circulaire ayant un comportement dangereux
 * Le clique sur ce bouton declence automatiquement une alerte
 */
const CircleButtonDanger = ({
  alertMessage, // Message d'aletre a afficher lorsque le bouton est cliqué
  onDelete, // Function appelé lorsque l'utilisateur confirme l'action, doit retourner True si l'action a reussi, False sinon
  iconName, // Nom de l'icon a utilisé pour le bouton
}) => {
  const handleDelete = React.useCallback(() => {
    Alert.alert("Attention !", alertMessage, [
      {
        text: "Oui, supprimer !",
        onPress: async () => {
          try {
            const deleted = await onDelete();
            // L'action a c'est elle déroulé correctement ?
            if (!deleted) {
              throw "error";
            }
          } catch (error) {
            Alert.alert(
              "Erreur",
              "Une erreur c'est produite lors de la suppression, veuillez réessayer !"
            );
          }
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  });

  return (
    <CircleButton iconName={iconName} onPress={handleDelete} type="danger" />
  );
};

export default CircleButtonDanger;
