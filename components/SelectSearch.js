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

const SelectSearch = ({
  label,
  value,
  fetchData,
  toText,
  keyExtractor,
  onSelect,
  error,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [errorShow, setErrorShow] = React.useState(false);

  const handleCloseModal = React.useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  React.useEffect(() => {
    if (error) {
      setErrorShow(true);
    }
  }, [error]);

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
