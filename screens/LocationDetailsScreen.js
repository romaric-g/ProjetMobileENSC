import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import locationService from "../api/locationService";
import CircleButton from "../components/CircleButton";
import CircleButtonDanger from "../components/CircleButtonDanger";
import SideActionHeader from "../components/SideActionHeader";
import styles from "../theme/styles";

const LocationDetailsScreen = ({ navigation, route }) => {
  const { location } = route.params;

  // Permet de recuper la durée de location en fonction de des dates dé début et fin séléctionnés
  const dureeLocation = React.useMemo(() => {
    if (!location.jourDebut) {
      return 0;
    } else if (location.jourDebut && !location.jourFin) {
      return 1;
    } else {
      start = moment(location.jourDebut);
      end = moment(location.jourFin);
      d = end.diff(start, "days") + 1;
      return d > 0 ? d : 0;
    }
  }, [location]);

  // Calcule le prix de la location en fonction de la periode choisit
  const prixLocation = React.useMemo(() => {
    return dureeLocation * location.materiel.prixParJour;
  }, [dureeLocation]);

  // Retourne le texte utilisé en fonction de la periode de location choisi
  const periodLocation = React.useMemo(() => {
    if (!location.jourDebut) {
      return "-";
    } else if (location.jourDebut && !location.jourFin) {
      return "Loué le " + moment(location.jourDebut).format("DD MMMM");
    } else {
      start = moment(location.jourDebut);
      end = moment(location.jourFin);
      return `Loué du ${start.format("DD MMMM")} au ${end.format("DD MMMM")}`;
    }
  }, [location]);

  const handleDelete = React.useCallback(async () => {
    const deleted = await locationService.deleteLocationById(location.id);

    if (deleted) {
      navigation.navigate({
        name: "LocationsList",
        params: { deletedLocationId: location.id },
        merge: true,
      });
    }

    return deleted;
  }, [location]);

  return (
    <View style={screenStyles.container}>
      <SideActionHeader
        leftAction={
          <CircleButtonDanger
            onDelete={handleDelete}
            alertMessage="Voulez-vous vraiement supprimer cette location ?"
            iconName="trash"
          />
        }
        rightAction={
          <CircleButton
            onPress={() => {
              navigation.navigate("EditLocation", {
                location: location,
              });
            }}
            iconName="create"
          />
        }
      >
        <View style={screenStyles.priceBox}>
          <Text style={screenStyles.priceText}>+ {prixLocation} €</Text>
        </View>
      </SideActionHeader>
      <Text style={styles.pageTitle}>{location.materiel.nom}</Text>
      <Text>{periodLocation}</Text>

      <View style={screenStyles.detailSection}>
        <TouchableOpacity style={screenStyles.clientBox}>
          <Text>
            Loué à {location.client.prenom} {location.client.nom}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={screenStyles.clientBox}>
          <Text>
            {location.materiel.nom} ({location.materiel.prixParJour}€/jour)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    flex: 1,
    alignItems: "center",
  },
  priceBox: {
    width: 140,
    height: 140,
    borderRadius: 120,
    backgroundColor: "#ddd",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  priceText: {
    color: "black",
    fontWeight: "800",
    fontSize: 24,
  },
  title: {},
  detailSection: {
    marginTop: 40,
    width: "100%",
    gap: 10,
  },
  clientBox: {
    padding: 15,
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
  },
});

export default LocationDetailsScreen;
