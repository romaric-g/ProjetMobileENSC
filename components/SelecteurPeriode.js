import { Calendar, CalendarList } from "react-native-calendars";
import { StyleSheet, View } from "react-native";
import React from "react";
import moment from "moment";
// LocaleConfig.locales["fr"] = {
//   monthNames: [
//     "Janvier",
//     "Février",
//     "Mars",
//     "Avril",
//     "Mai",
//     "Juin",
//     "Juillet",
//     "Août",
//     "Septembre",
//     "Octobre",
//     "Novembre",
//     "Décembre",
//   ],
//   monthNamesShort: [
//     "Janv.",
//     "Févr.",
//     "Mars",
//     "Avril",
//     "Mai",
//     "Juin",
//     "Juil.",
//     "Août",
//     "Sept.",
//     "Oct.",
//     "Nov.",
//     "Déc.",
//   ],
//   dayNames: [
//     "Dimanche",
//     "Lundi",
//     "Mardi",
//     "Mercredi",
//     "Jeudi",
//     "Vendredi",
//     "Samedi",
//   ],
//   dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
//   today: "Aujourd'hui",
// };
// LocaleConfig.defaultLocale = "fr";

const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const SelecteurPeriode = ({ style, periode, setPeriode }) => {
  const onDayPress = (day) => {
    if (periode.startDate === undefined) {
      setPeriode({
        startDate: day.dateString,
        endDate: undefined,
      });
    } else if (
      periode.endDate === undefined &&
      day.dateString > periode.startDate
    ) {
      setPeriode({
        ...periode,
        endDate: day.dateString,
      });
    } else {
      setPeriode({
        startDate: day.dateString,
        endDate: undefined,
      });
    }
  };

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
