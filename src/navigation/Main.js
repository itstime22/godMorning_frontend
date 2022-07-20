import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNav, LoginStackNav } from "./BottomTab";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogIn"
        component={LoginStackNav}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BottomTab"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Main;
