import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useState, useEffect, createRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
//import { CustomInput, CustomInput2 } from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [idChecking, setIdChecking] = useState(false);
  //const [fettodo, setFetchTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);
  //const [flag, setFlag] = useState(flag);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [errortext, setErrortext] = useState("");
  const nicknameRef = createRef();
  const usernameRef = createRef();
  const passwordRef = createRef();

  const idCheck = () => {
    setIdChecking(true);
    alert("중복검사 완료");
    //http://3.38.14.254/duplicationCheck?nickname={nickname}
  };

  const signUp = async () => {
    setErrortext("");
    // alert 띄우기
    //if (!idChecking) {
    //   alert("닉네임 중복검사를 해주세요.");
    // }
    if (username == "" || password == "") {
      alert("이메일과 비밀번호를 입력해주세요.");
    }

    setLoading(true);

    // var userData = {
    //   nickname: nickname,
    //   password: password,
    //   username: username,
    // };

    // var form = [];
    // for (var key in userData) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(userData[key]);
    //   form.push(encodedKey + "=" + encodedValue);
    // }
    // form = form.join("&");
    //console.log(form);
    //nickname=ddd&password=ddd&username=ddd%40gmail.com

    const response = await fetch("http://3.38.14.254/join", {
      method: "POST",
      body: JSON.stringify({
        nickname: nickname,
        password: password,
        username: username,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      //console.log(response.ok);
      setIsRegisterSuccess(true);
      alert("Register Success!");
    }
    const data = await response.json();
    //console.log(data); // object {"nickname": "333",}

    // axios
    //   .post("http://3.38.14.254/join", {
    //     nickname: nickname,
    //     password: password,
    //     username: username,
    //   })
    //   .then((res) => {
    //     //console.log(res.data.result);
    //     //console.log(res.data.token);
    //     //console.log(res.data.jwt);
    //     window.alert(res.data.result);
    //     console.log("성공");
    //     //AsyncStorage.setItem("token", res.data.jwt);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);

    //     //console.log(error);
    //     console.log(res.status);
    //     //throw new Error(error);
    //   });
  };

  if (isRegisterSuccess) {
    navigation.navigate("BottomTab");
  }
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

      <View style={styles.first}>
        <TextInput
          value={nickname}
          onChangeText={(nickname) => setNickname(nickname)}
          placeholder={"Nickname"}
          style={{
            backgroundColor: "#FFFFFF",
            width: "70%",
            height: 48,
            paddingLeft: 15,
            borderRadius: 5,
            marginBottom: 18,
            alignSelf: "center",
            marginLeft: 38,
            marginRight: 15,
          }}
          ref={nicknameRef}
          secureTextEntry={false}
          onSubmitEditing={
            () => usernameRef.current && usernameRef.current.focus()
            //nicknameRef.current && nicknameRef.current.focus()
          }
          blurOnSubmit={false}
          returnKeyType="next"
        />

        <TouchableOpacity style={styles.button} onPress={idCheck}>
          <Text
            style={{
              fontSize: 13,
              color: "#545454",
              fontFamily: "NanumSquareRoundB",
            }}
          >
            중복 검사
          </Text>
        </TouchableOpacity>
      </View>
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
        ref={usernameRef}
        secureTextEntry={false}
        onSubmitEditing={() =>
          //usernameRef.current && usernameRef.current.focus()
          passwordRef.current && passwordRef.current.focus()
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
        ref={passwordRef}
        secureTextEntry={true}
        onSubmitEditing={
          Keyboard.dismiss
          //passwordRef.current && passwordRef.current.focus()
        }
        blurOnSubmit={false}
        returnKeyType="next"
      />

      <CustomButton onPress={signUp} text="Sign In" />
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
  first: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 60,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#E5EBFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});

export default SignupScreen;
