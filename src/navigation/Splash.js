import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";

// const handleGetToken = async () => {
//     const dataToken = await AsyncStorage.getItem("AccessToken");
//     if (!dataToken) {
//       navigation.replace("LogIn");
//     } else {
//       navigation.replace("BottomTab");
//     }
//   };
const Splash = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setAnimating(false);
    setTimeout(() => {
      //handleGetToken();
      AsyncStorage.getItem("AccessToken").then((value) =>
        navigation.replace(value === null ? "LogIn" : "BottomTab")
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: 220,
          width: 230,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});

export default Splash;
