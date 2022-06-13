import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import todos from "../../assets/data/todos";
import { useNavigation } from "@react-navigation/native";
import RoutineButton from "../components/RoutineButton";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const MineScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <Text style={styles.title}>나의 루틴들</Text>
        <ScrollView contentContainerStyle={styles.routine}>
          <View style={styles.column1}>
            {todos.map((routine) => (
              <RoutineButton routine={routine} key={routine.id} />
            ))}
          </View>
          <View style={styles.column2}>
            {todos.map((routine) => (
              <RoutineButton routine={routine} key={routine.id} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: "NanumSquareRoundB",
    paddingLeft: 25,
    paddingBottom: 5,
    fontSize: 25,
  },
  todo: {
    borderWidth: 1,
  },
  container: {
    paddingTop: 70,
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  routine: {
    flexDirection: "row",
    justifyContent: "center",
  },

  column1: { left: 18 },
  column2: { right: 18 },
});

export default MineScreen;
