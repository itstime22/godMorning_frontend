import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  Image,
  View,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
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

const LoginScreen = ({ navigation }) => {
  const login = () => {
    navigation.navigate("BottomTab");
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

      {/*홈화면 로그인*/}
      <Pressable
        onPress={login}
        style={{
          top: 350,
          height: 50,
          width: 200,
          borderRadius: 10,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "gray",
            fontSize: 20,
            fontFamily: "NanumSquareRoundB",
          }}
        >
          go to home
        </Text>
      </Pressable>

      {/*kakao*/}

      <TouchableOpacity onPress={signInWithKakao}>
        <Image
          source={require("../../assets/images/kakaoStart2.png")}
          style={{ top: 150 }}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  appLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 130,
    height: 100,
    borderRadius: 30,
  },
  container: {},
});

export default LoginScreen;
