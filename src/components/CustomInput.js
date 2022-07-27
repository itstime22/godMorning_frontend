import React from "react";
import { StyleSheet, TextInput } from "react-native";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <TextInput
      value={value}
      onChangeText={(value) => setValue(value)}
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={secureTextEntry}
    />
  );
};

const CustomInput2 = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input2}
      value={value}
      onChangeText={(value) => setValue(value)}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

// 2. style 적용

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    width: "83%",
    height: 48,
    paddingLeft: 15,
    borderRadius: 5,
    marginBottom: 18,
    alignSelf: "center",
  },
  input2: {
    backgroundColor: "#FFFFFF",
    width: "70%",
    height: 48,
    paddingLeft: 15,
    borderRadius: 5,
    marginBottom: 18,
    alignSelf: "center",
    marginLeft: 34,
    marginRight: 11,
  },
});

export { CustomInput, CustomInput2 };
