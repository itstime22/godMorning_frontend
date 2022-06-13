import { useEffect, useState, useCallback } from "react";
import { addDays, format, getDate, startOfWeek, isSameDay } from "date-fns";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const WeekCalendar = ({ date }) => {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    const weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);

  // console.log(week, 'week')
  const getWeekDays = (date) => {
    //  console.log(date, 'datee')
    const start = startOfWeek(date, { weekStartsOn: 1 });
    //  console.log(start)
    const weekOfLength = 7;
    const final = [];
    for (let i = 0; i < weekOfLength; i++) {
      const date = addDays(start, i);
      final.push({
        formatted: format(date, "EEE"),
        date,
        day: getDate(date),
      });
    }
    return final;
  };

  return (
    <View style={styles.container}>
      {week.map((weekDay) => {
        const textStyles = [styles.dayText];
        const touchableStyles = [styles.touchableDay];
        const sameDay = isSameDay(weekDay.date, date);
        const onChange = (date) => {
          console.log(date);
        };
        if (sameDay) {
          textStyles.push(styles.selectedDayText);
          touchableStyles.push(styles.selectedTouchableDay);
        }
        return (
          <View style={styles.weekDayItems} key={weekDay.formatted}>
            <Text style={styles.weekDayText}>{weekDay.formatted}</Text>

            <TouchableOpacity
              onPress={() => onChange(weekDay.date)}
              style={touchableStyles}
            >
              <Text style={textStyles}>{weekDay.day}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",

    flexDirection: "row",
    justifyContent: "space-evenly",

    // width: '100%',
    width: Dimensions.get("window").width - 10,
  },
  week: {
    alignItems: "center",
  },
  weekDayText: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "NanumSquareRoundB",
  },
  dayText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  selectedDayText: {
    color: "red",
  },
});

export default WeekCalendar;
