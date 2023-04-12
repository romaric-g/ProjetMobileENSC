import "moment/locale/fr";
import moment from "moment/moment";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

moment.locale("fr");

const SelectSearchModal = (props) => {
  const {
    label,
    fetchData,
    toText,
    keyExtractor,
    selectTextBuilder,
    closeModal,
    onSelect,
  } = props;

  const [searchText, setSearchText] = React.useState();
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState();

  const searchData = React.useCallback(async () => {
    setIsLoading(true);

    const data = await fetchData(searchText);

    console.log(data);

    setData(data);
    setIsLoading(false);
  }, [searchText]);

  React.useEffect(() => {
    searchData();
  }, [searchText]);

  const filteredData = React.useMemo(() => {
    if (!searchText || !data) return data;

    return data.filter((item) => {
      let text = toText({ item });
      if (text.indexOf(searchText) >= 0) return true;
      return false;
    });
  }, [data, searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          editable
          placeholder={`Rechercher un '${label}'`}
          placeholderTextColor="#333333"
          maxLength={40}
          onChangeText={setSearchText}
          value={searchText}
          style={styles.searchInput}
        />
        {/*  */}
      </View>
      <View style={styles.results}>
        <FlatList
          data={filteredData}
          renderItem={(data) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onSelect(data);
                  closeModal();
                }}
                style={styles.resultItem}
              >
                <Text>{toText(data)}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={keyExtractor}
        />
      </View>
      <View style={styles.centerBottom}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Ionicons style={{ flex: 0 }} name={"ios-close"} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
  },
  header: {
    paddingBottom: 10,
  },
  results: {},
  resultItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  searchInput: {
    height: 40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#EEE",
  },
  centerBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    height: 60,
    width: 60,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default SelectSearchModal;
