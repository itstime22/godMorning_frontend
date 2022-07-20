import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/Ionicons";

const LoginScreen = ({ navigation }) => {
  const login = () => {
    navigation.navigate("BottomTab");
  };
  const goBack = () => {
    navigation.goBack();
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
        //alignItems: "center",
      }}
    >
      <Pressable onPress={goBack} style={styles.btn}>
        <Icon name={"chevron-back"} size={30} color={"white"} />
      </Pressable>
      <View style={styles.signInTextContainer}>
        <Text style={styles.signInText}>안녕하세요,</Text>
        <Text style={styles.signInText}>GOD[T] MORNING 입니다.</Text>
        <Text style={styles.signInTextS}>
          서비스 이용을 위해 회원가입 해주세요.
        </Text>
      </View>
      <View>
        <CustomInput
          value={username}
          setValue={setUsername}
          placeholder="Username"
        />
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder="Email address"
        />
        <CustomInput
          value={password}
          setValue={setPassword}
          placeholder="Password"
        />
        <CustomButton onPress={login} text="Sign In" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  signInTextContainer: {
    //marginTop: "23%",
    marginLeft: "10%",
    //justifyContent: "center",
  },
  signInText: {
    fontSize: 25,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 33,
    fontFamily: "NanumSquareRoundB",
  },
  signInTextS: {
    fontSize: 15,
    fontWeight: "300",
    color: "#FFFFFF",
    marginTop: 5,
    marginBottom: 50,
    //color: "#EEEEEE",
    fontFamily: "NanumSquareRoundR",
  },
  btn: { position: "absolute", top: 40, left: 10 },
  container: {},
});

export default LoginScreen;
