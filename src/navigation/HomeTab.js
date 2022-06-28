import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import PopularScreen from "../screens/PopularScreen";
import NewScreen from "../screens/NewScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OtherRoutineScreen from "../screens/OtherRoutineScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

const HomeTab = createMaterialTopTabNavigator();

const HomeTabNav = () => {
  return (
    <HomeTab.Navigator
      screenOptions={{
        //tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: {
          backgroundColor: "white",
        },
        tabBarItemStyle: { width: 100, height: 60 },
        swipeEnabled: false,
      }}
      //initialRouteName="Home"
    >
      <HomeTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: ({ focused }) => (
            <Text style={focused ? styles.actTitle : styles.title}>홈</Text>
          ),
        }}
      />
      <HomeTab.Screen
        name="popular"
        component={PopularScreen}
        options={{
          title: ({ focused }) => (
            <Text style={focused ? styles.actTitle : styles.title}>인기</Text>
          ),
        }}
      />
      <HomeTab.Screen
        name="new"
        component={NewScreen}
        options={{
          title: ({ focused }) => (
            <Text style={focused ? styles.actTitle : styles.title}>신규</Text>
          ),
        }}
      />
    </HomeTab.Navigator>
  );
};

const MyHomeStack = createNativeStackNavigator();
const MyHomeStackNav = () => {
  return (
    <MyHomeStack.Navigator>
      <MyHomeStack.Screen
        name="HomeTab"
        component={HomeTabNav}
        options={{
          headerTitle: () => (
            <View style={styles.container}>
              <Image
                style={{ height: 25, width: 25 }}
                source={require("../../assets/images/logo.png")}
              />
              <Text style={styles.ttitle}>GOD[T] Morning</Text>
            </View>
          ),
          title: "GOD[T] Morning",
        }}
      />
      <MyHomeStack.Screen
        name="Others"
        component={OtherRoutineScreen}
        options={{ headerShown: false }}
      />
    </MyHomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "NanumSquareRoundB",
    fontSize: 20,
    fontWeight: "bold",
    color: "#757575",
  },
  ttitle: {
    left: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "NanumSquareRoundB",
  },
  actTitle: {
    fontFamily: "NanumSquareRoundB",
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});
export default MyHomeStackNav;
