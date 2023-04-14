import React from "react";
import CircleButton from "./CircleButton";
import { Alert } from "react-native";

const CircleButtonDanger = ({ alertMessage, onDelete, iconName }) => {
  const handleDelete = React.useCallback(() => {
    Alert.alert("Attention !", alertMessage, [
      {
        text: "Oui, supprimer !",
        onPress: async () => {
          const deleted = onDelete();
          if (!deleted) {
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
