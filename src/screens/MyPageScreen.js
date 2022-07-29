import { useState, useEffect } from "react";
import { Image, Text, StyleSheet, View, Pressable, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyPageScreen = ({ navigation }) => {
  const inset = useSafeAreaInsets();

  const onMinePressed = () => {
    navigation.navigate("Mine", { id: id });
  };
  const onScrapPressed = () => {
    navigation.navigate("Scrap", { id: id });
  };
  const loginPressed = () => {
    Alert.alert("로그아웃 하시겠습니까?", [
      {
        text: "아니요",
        onPress: () => navigation.goBack(),
      },
      { text: "예" },
    ]);
  };
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("@userData");
      //return data !== null
      const jsonObject = JSON.parse(data);
      setNickname(jsonObject.map.nickname);
      setId(jsonObject.map.id);
      //: console.log("데이터 없음");
    } catch (err) {
      console.log("err");
    }
  };
  getData();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
        backgroundColor: "white",
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
      </View>
      <View style={styles.first}>
        <Text style={styles.title}>마이 페이지</Text>
      </View>
      <View
        style={{
          borderBottomColor: "#C4C4C4",
          borderBottomWidth: 1,
          marginBottom: 5,
        }}
      />
      <View style={styles.profile}>
        <FontAwesome name="user" size={50} />
        <Text style={styles.name}>{nickname} 님</Text>
      </View>

      <View style={styles.second}>
        <Text style={styles.menu}>나의 루틴들</Text>
        <Pressable onPress={onMinePressed}>
          <FontAwesome name="chevron-right" size={23} style={styles.icon} />
        </Pressable>
      </View>

      <View style={styles.second}>
        <Text style={styles.menu}>스크랩한 모닝 루틴들</Text>
        <Pressable onPress={onScrapPressed}>
          <FontAwesome name="chevron-right" size={23} style={styles.icon} />
        </Pressable>
      </View>
      <View
        style={{
          borderBottomColor: "#C4C4C4",
          borderBottomWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      />

      {/*<Text style={{ fontSize: 20, left: 30, top: 20 }}>기타</Text>*/}

      <Text
        style={{
          fontSize: 23,
          left: 38,
          top: 20,
          fontFamily: "NanumSquareRoundB",
          marginBottom: 30,
        }}
      >
        기타
      </Text>
      <View style={styles.second}>
        <Text style={styles.menu}>로그아웃</Text>
        <Pressable onPress={loginPressed}>
          <FontAwesome name="chevron-right" size={23} style={styles.icon} />
        </Pressable>
      </View>
      <View style={styles.second}>
        <Text style={styles.menu}>회원탈퇴</Text>
        <Pressable>
          <FontAwesome name="chevron-right" size={23} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    //width: 280,
    //  height: 290,
    top: 270,
    opacity: 0.5,
  },
  title: {
    color: "black",
    fontSize: 25,
    fontFamily: "NanumSquareRoundB",
    left: 20,
  },
  profile: {
    flexDirection: "row",
    alignContent: "center",
    marginLeft: 25,
    margin: 35,
  },
  menu: {
    fontFamily: "NanumSquareRoundB",
    fontSize: 20,
  },
  name: {
    color: "black",
    fontSize: 28,
    fontFamily: "NanumSquareRoundB",
    marginLeft: 18,
    alignItems: "center",
    top: 10,
  },
  first: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  second: {
    flexDirection: "row",
    padding: 20,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },

  icon: {
    //right: 15,
    color: "#757575",
    padding: 20,
  },
});

export default MyPageScreen;
