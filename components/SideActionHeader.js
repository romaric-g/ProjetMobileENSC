import { Text, View } from "react-native";

/**
 * Ce composant permet d'afficher une action de chaque coté d'un élement
 */

const SideActionHeader = ({
  leftAction, // Action affiché à gauche (JSX élement)
  rightAction, // Action affiché à droite (JSX élement)
  children, // Le composant qui sera au centre des 2 actions (JSX élement)
}) => {
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
