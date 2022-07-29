import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import {
  useNavigation,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import MyRoutineButton from "../components/MyRoutineButton";
import axios from "axios";
import Spinner from "../../assets/spinner.gif";
// 마이페이지 > 내가 작성한 루틴

const MineScreen = () => {
  const navigation = useNavigation();
  const [fettodo, setFetchTodo] = useState(null);
  const [timeId, setTimeId] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState(false);
  const isFocused = useIsFocused();
  const route = useRoute();
  useEffect(() => {
    const fetching = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setFetchTodo(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);

        const response = await axios.get(
          //`http://3.38.14.254/myRoutine/${route.params?.id}`
          "http://3.38.14.254/newRoutine/list"
        );
        setFetchTodo(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
      setFlag(!flag);
    };
    fetching();
  }, [isFocused]);
  console.log(fettodo, "my");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내가 올린 루틴</Text>

      {fettodo !== null ? (
        <ScrollView contentContainerStyle={styles.routine}>
          <View style={styles.column1}>
            {fettodo
              .filter((item) => item.post_no % 2 == 1)
              .map((routine) => (
                <MyRoutineButton routine={routine} key={routine.post_no} />
              ))}
          </View>
          <View style={styles.column2}>
            {fettodo
              .filter((item) => item.post_no % 2 == 0)
              .map((routine) => (
                <MyRoutineButton routine={routine} key={routine.post_no} />
              ))}
          </View>
        </ScrollView>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={Spinner}
            style={{ marginTop: 250, width: 100, height: 100 }}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: "NanumSquareRoundB",
    paddingLeft: 25,
    paddingBottom: 5,
    fontSize: 25,
  },
  todo: {
    borderWidth: 1,
  },
  container: {
    paddingTop: 70,
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  routine: {
    flexDirection: "row",
    justifyContent: "center",
  },

  column1: { left: 18 },
  column2: { right: 18 },
});

export default MineScreen;
