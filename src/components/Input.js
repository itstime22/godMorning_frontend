import { useState, useEffect, useCallback } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Input = ({ value, onChangeText, onSubmitEditing }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="To do, 시간"
        maxLength={50}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={"gray"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get("window").width - 25,
    fontSize: 18,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    margin: 5,
    padding: 8,
    alignItems: "center",
    fontFamily: "Cafe24Ohsquareair",
  },
});

export default Input;
