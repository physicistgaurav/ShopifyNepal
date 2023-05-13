import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import MyProducts from "../screens/MyProducts";
import MyCart from "../screens/MyCart";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProducts"
        component={MyProducts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyCart"
        component={MyCart}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
