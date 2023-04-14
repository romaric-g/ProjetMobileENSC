import { Text, View } from "react-native";

const SideActionHeader = ({ leftAction, rightAction, children }) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          left: 10,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {leftAction}
      </View>
      {children}
      <View
        style={{
          position: "absolute",
          right: 10,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rightAction}
      </View>
    </View>
  );
};

export default SideActionHeader;
