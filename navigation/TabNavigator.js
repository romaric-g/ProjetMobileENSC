import React from "react";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocationStackNavigator from "./LocationStackNavigator";
import ClientsStackNavigator from "./ClientsStackNavigator";
import MaterialStackNavigator from "./MaterialStackNavigator";
import { Logs } from "expo";
import { InternetContext } from "../context/InternetContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import NoConnection from "../components/NonConnection";

const TabStack = createBottomTabNavigator();

const LOCATION_STACK = "Locations en cours";
const MATERIAL_STACK = "Materiels";
const CLIENT_STACK = "Clients";

const TabNavigator = () => {
  Logs.enableExpoCliLogging();

  const [isLoading, setIsLoading] = React.useState(true);

  const { networkAvailable, setNetworkAvailable } =
    React.useContext(InternetContext);

  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      setNetworkAvailable(state.isConnected);
      setIsLoading(false);
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      setNetworkAvailable(state.isConnected);
    });

    unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          MyLocation
        </Text>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#f4511e" />
      {!networkAvailable && (
        <SafeAreaProvider style={{ flex: 0 }}>
          <SafeAreaView style={{ backgroundColor: "#f4511e" }}>
            <NoConnection />
          </SafeAreaView>
        </SafeAreaProvider>
      )}
      <TabStack.Navigator
        screenOptions={({ route }) => ({
          // Icons will be different if the tab is focused
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === LOCATION_STACK) {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === MATERIAL_STACK) {
              iconName = focused ? "pricetag" : "pricetag-outline";
            } else if (route.name === CLIENT_STACK) {
              iconName = focused ? "ios-list" : "ios-list-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          // Hiding tab navigator header to show only stack header
          headerShown: false,
        })}
      >
        <TabStack.Screen
          name={LOCATION_STACK}
          component={LocationStackNavigator}
        />
        <TabStack.Screen
          name={MATERIAL_STACK}
          component={MaterialStackNavigator}
        />
        <TabStack.Screen
          name={CLIENT_STACK}
          component={ClientsStackNavigator}
        />
      </TabStack.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
