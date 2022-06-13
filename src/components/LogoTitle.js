import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const LogoTitle = () => {
  return (
    <View>
      <View style={styles.container}>
        <Image
          style={{ height: 25, width: 25 }}
          source={require("../../assets/images/logo.png")}
        />
        <Text style={styles.title}>GOD[T] Morning</Text>
      </View>
      <View
        style={{
          borderBottomColor: "#C4C4C4",
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    left: 10,
    marginBottom: 10,
  },
  title: {
    left: 10,
    top: 5,
    color: "black",
    fontSize: 20,
    fontFamily: "NanumSquareRoundEB",
  },
});

export default LogoTitle;
