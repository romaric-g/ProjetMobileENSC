import "moment/locale/fr";
import moment from "moment/moment";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

moment.locale("fr");

const SelectSearchModal = (props) => {
  const { label, fetchData, listItemBuilder, selectTextBuilder } = props;

  const [searchText, setSearchText] = React.useState();
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState();

  const searchData = React.useCallback(async () => {
    setIsLoading(true);

    const data = await fetchData();

    setData(data);
    setIsLoading(false);
  }, [data]);

  React.useEffect(() => {
    searchData();
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          editable
          maxLength={40}
          onChangeText={setSearchText}
          value={searchText}
          style={{
            flex: 1,
            height: 40,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: "white",
          }}
        />
        <Ionicons
          style={{ flex: 0 }}
          name={"ios-information-circle"}
          size={24}
        />
        ;
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    width: "100%",
    flex: 1,
    backgroundColor: "purple",
  },
  header: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  results: {
    flex: 1,
  },
});

export default SelectSearchModal;
