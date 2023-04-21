import AsyncStorage from "@react-native-async-storage/async-storage";

export const cacheDataObject = async (key, object) => {
  try {
    const json = JSON.stringify(object);
    await AsyncStorage.setItem(key, json);
  } catch (e) {
    // Error reading value
  }
};

export const getCachedDataObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // Error reading value
  }
};
