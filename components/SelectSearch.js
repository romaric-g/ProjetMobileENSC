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
import { SafeAreaView } from "react-native-safe-area-context";
import SelectSearchModal from "./SelectSearchModal";

moment.locale("fr");

const SelectSearch = ({
  label,
  fetchData,
  listItemBuilder,
  selectTextBuilder,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState();

  const selectedItemText = React.useMemo(() => {
    if (!selectedData) {
      return "-";
    }
    return selectTextBuilder(selectedData);
  }, [selectedData, selectTextBuilder]);

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
        <Text style={{ fontSize: 16 }}>{selectedItemText}</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SelectSearchModal
          label={label}
          fetchData={fetchData}
          listItemBuilder={listItemBuilder}
          selectTextBuilder={selectTextBuilder}
        />
      </Modal>
    </TouchableOpacity>
  );
};

export default SelectSearch;
