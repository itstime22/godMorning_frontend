import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  Image,
} from "react-native";
import { useState, useEffect, createRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
//import { CustomInput } from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();

  const login = async () => {
    setErrortext("");
    if (!username) {
      alert("이메일을 입력하세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }
    setLoading(true);

    // goToMain = e => {
    //   e.preventDefault();
    //   fetch('http://10.58.4.36:8000/users/signin', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       email: this.state.idVal,
    //       password: this.state.pwVal,
    //     }),
    //   })
    //     .then(response => response.json())
    //     .then(response => {
    //       if (response.token) {
    //         localStorage.setItem('token', response.token);
    //         this.props.history.push('/main.js');
    //       } else {
    //         alert('계정 정보를 다시 확인하여 다시 로그인해 주세요.');
    //       }
    //     });
    // };

    await fetch("http://3.38.14.254/login", {
      method: "POST",
      body: JSON.stringify({
        password: password,
        username: username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.headers);
      })
      .then((response) => {
        console.log(response);
        //console.log(response.text)
        // setLoading(false);
        // console.log(response);
        // console.log(response.ok);
        // console.log(response.status);
        // console.log(response.data.username);
        if (!response) {
          //AsyncStorage.setItem("username", response.data.username);
          navigation.replace("BottomTab");
        } else {
          setErrortext(response.msg);
          alert("이메일과 비밀번호를 다시 확인하세요.");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const llogin = () => {
    navigation.navigate("BottomTab");
  };
  const goBack = () => {
    navigation.goBack();
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
        //alignItems: "center",
      }}
    >
      <Pressable onPress={goBack} style={styles.btn}>
        <Icon name={"chevron-back"} size={30} color={"white"} />
      </Pressable>

      <View style={styles.signInTextContainer}>
        <Text style={styles.signInText}>안녕하세요,</Text>
        <Text style={styles.signInText}>GOD[T] MORNING 입니다.</Text>
        <Text style={styles.signInTextS}>회원가입 후 로그인을 해주세요.</Text>
      </View>
      <View>
        <TextInput
          value={username}
          onChangeText={(username) => setUsername(username)}
          placeholder={"Email address"}
          style={{
            backgroundColor: "#FFFFFF",
            width: "83%",
            height: 48,
            paddingLeft: 15,
            borderRadius: 5,
            marginBottom: 18,
            alignSelf: "center",
          }}
          secureTextEntry={false}
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          blurOnSubmit={false}
          keyboardType="email-address"
          returnKeyType="next"
        />
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder={"Password"}
          style={{
            backgroundColor: "#FFFFFF",
            width: "83%",
            height: 48,
            paddingLeft: 15,
            borderRadius: 5,
            marginBottom: 18,
            alignSelf: "center",
          }}
          secureTextEntry={true}
          onSubmitEditing={
            Keyboard.dismiss
            //passwordRef.current && passwordRef.current.focus()
          }
          blurOnSubmit={false}
          returnKeyType="next"
        />

        <CustomButton onPress={llogin} text="Sign In" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  signInTextContainer: {
    //marginTop: "23%",
    marginLeft: "10%",
    justifyContent: "center",
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
    fontFamily: "NanumSquareRoundR",
  },
  btn: { position: "absolute", top: 40, left: 10 },
});

export default LoginScreen;
