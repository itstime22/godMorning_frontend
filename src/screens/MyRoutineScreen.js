import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { isSameDay, addDays, format, getDate, startOfWeek } from "date-fns";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../components/Input";
import Title from "../components/Title";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Task from "../components/Task";
import TimePick from "../components/TimePick";
import { FontAwesome } from "@expo/vector-icons";

const MyRoutineScreen = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({});

  /*title*/
  const [title, setTitle] = useState("");

  /*Date*/
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  function printDate() {
    const today = selectedDate; // 현재 날짜

    const month = today.toLocaleDateString("en-US", {
      month: "2-digit",
    });
    const day = today.toLocaleDateString("en-US", {
      day: "2-digit",
    });
    const dayName = today.toLocaleDateString("ko-KR", {
      weekday: "long",
    });

    return Platform.OS === "ios" ? `${month}.${day} ${dayName}` : `${month}`;
  }

  const [hoursRange, setHoursRange] = useState({
    1: { id: "1", text: "Start" },
    2: { id: "2", text: "End" },
  });
  const _passingtime = (item, text) => {
    const newRange = Object.assign({}, hoursRange);
    newRange[item.id]["text"] = text;
    setHoursRange(newRange);
  };

  /*task*/
  const _deleteTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
  };
  const _updateTask = (item) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    setTasks(currentTasks);
  };
  const _toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]["completed"] = !currentTasks[id]["completed"];
    setTasks(currentTasks);
  };
  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask("");
    setTasks({ ...tasks, ...newTaskObject });
  };
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  /*week */
  const [week, setWeek] = useState([]);
  useEffect(() => {
    const weekDays = getWeekDays(selectedDate);
    setWeek(weekDays);
  }, [selectedDate]);

  const getWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
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
  const onChange = (date) => {
    setSelectedDate(date);
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
        paddingTop: 140,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/*날짜+요일 출력*/}
      <StatusBar style="dark" />
      <View style={styles.datepicker}>
        <Text
          style={{
            margin: 10,
            fontSize: 25,
            fontFamily: "NanumSquareRoundB",
          }}
        >
          {selectedDate ? printDate() : "No date selected"}
        </Text>
        <FontAwesome name="caret-down" size={30} onPress={showDatePicker} />

        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          display="inline"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      {/*week 캘린더*/}
      <View style={styles.weekpicker}>
        <View style={styles.weekcontainer}>
          {week.map((weekDay) => {
            const textStyles = [styles.dayText];
            const touchableStyles = [styles.touchableDay];
            const sameDay = isSameDay(weekDay.date, selectedDate);

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
      </View>

      {/*루틴 작성*/}
      <View style={styles.todo}>
        <Title value={title} onChangeText={setTitle}></Title>

        <View style={[styles.timePick]}>
          {Object.values(hoursRange).map((item) => (
            <TimePick key={item.id} item={item} />
          ))}
          {/*
          <Button
            title="  재설정"
            onPress={_renewHour}
            style={{ fontSize: 200, fontWeight: '600', marginLeft: 15 }}
          />
           */}
        </View>

        <Input
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
        />
        <ScrollView>
          {Object.values(tasks).map((item) => (
            <Task
              key={item.id}
              item={item}
              deleteTask={_deleteTask}
              toggleTask={_toggleTask}
              updateTask={_updateTask}
            />
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  datepicker: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: -30,
  },
  weekpicker: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: "100%",
  },
  week: {
    alignItems: "center",
  },
  todo: {
    justifyContent: "center",
    alignItems: "center",
  },
  timePick: {
    width: Dimensions.get("window").width - 10,
    alignItems: "flex-start",
    left: 10,

    flexDirection: "row",
    //alignItems: 'center',
    //  justifyContent: 'center',

    //paddingHorizontal: 17,
    //marginRight: Dimensions.get('window').width - 220,
    marginBottom: 10,
  },
  weekcontainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",

    // width: '100%',
    width: Dimensions.get("window").width - 10,
  },
  week: {
    alignItems: "center",
  },
  weekDayItems: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  weekDayText: { fontSize: 17, marginBottom: 5, fontWeight: "500" },
  dayText: { fontSize: 20 },
  selectedDayText: {
    color: "white",
    fontWeight: "bold",
  },
  selectedTouchableDay: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 30,
  },
});

export default MyRoutineScreen;
