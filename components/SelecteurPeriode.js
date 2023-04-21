import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import { StyleSheet, View } from "react-native";
import React from "react";
import moment from "moment";

// Permet de passer le calendrier en français
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

// Retourne la liste des dates comprises entre 2 dates
const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/**
 * Permet d'afficher un selection de periode
 */
const SelecteurPeriode = ({ style, periode, setPeriode }) => {
  const onDayPress = (day) => {
    // Si la date de départ n'a pas encore été sélectionné
    if (periode.startDate === undefined) {
      // On définit la date cliqué comme la date de départ
      setPeriode({
        startDate: day.dateString,
        endDate: undefined,
      });
    } else if (
      // Si la date de fin n'a pas encore été défini et que la date cliqué et plus grande que la date de départ
      periode.endDate === undefined &&
      day.dateString > periode.startDate
    ) {
      // On définit la date cliqué comme la date de fin
      setPeriode({
        ...periode,
        endDate: day.dateString,
      });
    } else {
      // Sinon : On définit la date cliqué comme la date de départ
      setPeriode({
        startDate: day.dateString,
        endDate: undefined,
      });
    }
  };

  // Permet de récuperer la liste des dates selectionné
  // react-native-calendars ne peut selectionner les dates entre A et B, il faut lui donner la liste de toutes les dates
  const markedDates = React.useMemo(() => {
    let dates = {};

    const startDate = periode.startDate;
    const endDate = periode.endDate;

    let datesInRange = [];
    if (startDate && endDate) {
      datesInRange = getDatesInRange(startDate, endDate);
    } else {
      datesInRange = [new Date(startDate)];
    }

    for (const date of datesInRange) {
      dateKey = moment(date).format("YYYY-MM-DD");
      dates[dateKey] = {
        startingDay: dateKey === periode.startDate,
        endingDay:
          dateKey === endDate ||
          (dateKey === periode.startDate && endDate === undefined),
        color: "orange",
      };
    }

    return dates;
  }, [periode]);

  return (
    <View style={{ ...styles.container, ...style }}>
      <CalendarList
        pastScrollRange={0}
        futureScrollRange={12}
        markingType={"period"}
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default SelecteurPeriode;
