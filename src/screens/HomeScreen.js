import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import todos from "../../assets/data/todos";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import RoutineButton from "../components/RoutineButton";
import closestIndexTo from "date-fns/fp/closestIndexTo/index";
import axios from "axios";
import Spinner from "../../assets/spinner.gif";

function HomeScreen() {
  const navigation = useNavigation();
  const [fettodo, setFetchTodo] = useState(null);
  const [timeId, setTimeId] = useState(4);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState(false);
  const isFocused = useIsFocused();
  const wisesaying = [
    "나는 날마다, 모든 면에서, 점점 더 좋아지고 있다",
    "인생에 뜻을 세우는데 적당한 때는 없다",
    "실패는 잊어라. 하지만 교훈은 잊으면 안 된다",
    "행복하기 때문에 웃는 게 아니라, 웃기 때문에 행복하다",
    "다른 사람이 아닌 너 자신이 돼라.",
    "승자는 시간을 관리하며 살고 패자는 시간에 끌려 산다",
    "인내가 최상의 미덕이다",
    "웃는 자에게 복이 온다",
    "수학은 정답이 있지만 인생은 정답이 없다",
    "삶이 있는 한 희망은 있다",
    "피할 수 없으면 즐겨라",
    "계단을 밟아야 계단 위에 올라설 수 있다",
    "행복은 습관이다",
    "겨울이 오면 봄이 멀지 않으리",
    "내 비장의 무기는 아직 손안에 있다. 그것은 희망이다",
    "가장 큰 위험은 위험 없는 삶이다",
    "오늘 할 수 있는 일을 내일로 미루지 마라",
    "위험은 자신이 무엇을 하는지 모르는 데서 온다",
    "모든 사람들로부터 사랑받지 않아도 된다",
    "망설이면 두려움만 커진다",
    "실패를 허락하는 것이 성공을 허락하는 것이다",
    "미래를 만드는 건 현재다",
    "훌륭한 사람과 어리석은 사람의 차이는 불과 한 끗 차이다",
    "정해진 것은 아무것도 없다. 정해진 운명 또한 없다",
    "너의 운명의 별은 너의 마음속에 있다",
    "당신의 하루하루를 당신의 마지막 날이라고 생각하라",
    "작은 기회로부터 위대한 업적이 시작된다",
    "쓰러지지 않으려면 뛰어야 한다",
    "미래는 지금이다",
    "실패는 성공을 돋보이게 하는 조미료",
    "길을 잃는다는 것은 곧, 길을 알게 되는 것이다.",
    "인생의 비결은 그것을 다루는 방법입니다",
    "하는 것은 상상에서 비약적인 도약입니다",
    "스스로 행복하다고 믿지 않으면, 그 누구도 행복할 수 없다.",
    "인생은 한 권의 책과 같다",
    "변명 중에서 가장 어리석은 변명은 '시간이 없어서'다",
    "인내는 쓰다. 그러나 그 열매는 달다.",
    "꿈을 꿀 수 있다면, 그 꿈을 실현할 수 있다",
    "멈추지 말고 느리게라도 뛰어봐!",
    "오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아간다",
  ];

  const getRandomIndex = function (length) {
    return parseInt(Math.random() * length);
  };

  useEffect(() => {
    const fetching = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setFetchTodo(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get("http://3.38.14.254/newRoutine/list");
        setFetchTodo(response.data); // 데이터는 response.data 안에 들어있습니다.
        //console.log(response.data)
      } catch (e) {
        setError(e);
      }
      setLoading(false);
      setFlag(!flag);
    };
    fetching();
  }, [isFocused]);

  useEffect(() => {
    fettodo !== null
      ? setTimeTodos(
          fettodo.filter(
            (routine) =>
              routine.startTime.charAt(0) == timeId ||
              routine.startTime.substring(0, 2) == timeId
          )
        )
      : console.log("아직");
  }, [timeId, flag]);

  const timeTable = [
    { id: 4, title: "4시", isSelect: true },
    { id: 5, title: "5시", isSelect: false },
    { id: 6, title: "6시", isSelect: false },
    { id: 7, title: "7시", isSelect: false },
    { id: 8, title: "8시", isSelect: false },
    { id: 9, title: "9시", isSelect: false },
    { id: 10, title: "10시", isSelect: false },
    { id: 11, title: "11시", isSelect: false },
    { id: 12, title: "12시", isSelect: false },
  ];

  const [times, setTimes] = useState(timeTable);

  const [timeTodos, setTimeTodos] = useState(null);

  const ontimePress = (index) => {
    setTimeId(index);

    const newTable = times.map((time) => {
      if (time.id == index) {
        return { ...time, isSelect: true };
      } else {
        return { ...time, isSelect: false };
      }
    });
    setTimes(newTable);
  };

  return (
    <View style={styles.container}>
      <View style={styles.t_container}>
        <ScrollView style={{ paddingLeft: 10 }} horizontal={true}>
          {times.map((time, index) =>
            time.isSelect ? (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => ontimePress(time.id)}
                  style={styles.selectedButton}
                >
                  <Text style={styles.selectedTime}>{time.title}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => ontimePress(time.id)}
                  style={styles.button}
                >
                  <Text style={styles.time}>{time.title}</Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </ScrollView>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/images/wisesaying.png")}
          style={{ position: "absolute", width: "95%" }}
        />

        <Text
          style={{
            fontSize: 15,
            fontFamily: "NanumSquareRoundR",
          }}
        >
          {wisesaying[getRandomIndex(wisesaying.length)]}
        </Text>
      </View>

      <View style={styles.r_container}>
        <ScrollView contentContainerStyle={styles.routine}>
          {fettodo !== null && timeTodos !== null ? (
            <>
              <View style={styles.column1}>
                {timeTodos
                  .filter((routine, index) => index % 2 == 0)
                  .map((routine) => (
                    <RoutineButton routine={routine} key={routine.post_no} />
                  ))}
              </View>
              <View style={styles.column2}>
                {timeTodos
                  .filter((routine, index) => index % 2 == 1)
                  .map((routine) => (
                    <RoutineButton routine={routine} key={routine.post_no} />
                  ))}
              </View>
            </>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={Spinner} style={{ width: 100, height: 100 }} />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wise: {
    backgroundColor: "#FCE1F4",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: 40,
  },
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "white",
  },
  routine: {
    flexDirection: "row",
    justifyContent: "center",
    //flex: 1,
  },

  r_container: {
    flex: 1,
  },

  column1: {
    //position: "absolute",
    left: 15,
    width: "50%",
  },
  column2: {
    //position: "absolute",
    right: 15,
    width: "50%",
  },
  t_container: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 35,
    borderRadius: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  selectedButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 35,
    marginHorizontal: 10,
    backgroundColor: "#A4BDFF",
    borderRadius: 15,
  },
  selectedTime: {
    fontSize: 20,
    fontFamily: "NanumSquareRoundB",
    color: "white",
  },
  time: {
    fontSize: 20,
    color: "gray",
    fontFamily: "NanumSquareRoundB",
  },
});
export default HomeScreen;
