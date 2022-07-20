import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
{
  /*import {
  KakaoOAuthToken,
  KakaoProfile,
  //getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";
const signInWithKakao = async () => {
  const token = await login();
  setResult(JSON.stringify(token));
};
const signOutWithKakao = async () => {
  const message = await logout();
  setResult(message);
};
const getKakaoProfile = async () => {
  const profile = await getProfile();
  setResult(JSON.stringify(profile));
};
const unlinkKakao = async () => {
  const message = await unlink();
  setResult(message);
};
*/
}

const InitialScreen = ({ navigation }) => {
  const login = () => {
    navigation.navigate("Login");
  };
  const signup = () => {
    navigation.navigate("SignUp");
  };

  return (
    <LinearGradient
      colors={[
        "#9DC0FF",
        "rgba(184, 181, 255, 0.97) ",
        "rgba(210, 171, 217, 0.85) ",
        "rgba(248, 204, 187, 0.94) ",
        "rgba(255, 249, 179, 0.82) ",
      ]}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          position: "absolute",
          width: 500,
          height: 500,
        }}
        source={require("../../assets/images/title.png")}
      />

      <View style={styles.buttonContainer}>
        <Pressable onPress={signup} style={styles.button}>
          <Text style={styles.text}>Create an Account</Text>
        </Pressable>
        <Pressable onPress={login} style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: 300,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 400,
  },
  text: {
    color: "#545454",
    fontSize: 16,
    fontFamily: "NanumSquareRoundB",
  },
});

export default InitialScreen;
