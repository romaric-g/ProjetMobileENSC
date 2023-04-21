import React from "react";
import CircleButton from "./CircleButton";
import { Alert } from "react-native";

const CircleButtonDanger = ({ alertMessage, onDelete, iconName }) => {
  const handleDelete = React.useCallback(() => {
    Alert.alert("Attention !", alertMessage, [
      {
        text: "Oui, supprimer !",
        onPress: async () => {
          try {
            const deleted = await onDelete();
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
