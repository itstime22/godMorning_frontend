import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import MyRoutineButton from "../components/MyRoutineButton";
import axios from "axios";
import Spinner from "../../assets/spinner.gif";

// 마이페이지 > 내가 스크랩한 루틴

const ScrapScreen = () => {
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
        setError(null);
        setFetchTodo(null);
        setLoading(true);

        const response = await axios.get("http://3.38.14.254/heart/rank");
        setFetchTodo(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
      setFlag(!flag);
    };
    fetching();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>스크랩한 루틴</Text>
      {fettodo !== null ? (
        <ScrollView contentContainerStyle={styles.routine}>
          <View style={styles.column1}>
            {fettodo
              .filter((item) => item.post_no % 2 == 0)
              .map((routine) => (
                <MyRoutineButton routine={routine} key={routine.post_no} />
              ))}
          </View>
          <View style={styles.column2}>
            {fettodo
              .filter((item) => item.post_no % 2 == 1)
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

export default ScrapScreen;
