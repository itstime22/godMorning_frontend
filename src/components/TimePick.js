import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePick = ({ item, text, id, setHoursRange, hoursRange }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  /*new*/
  const handleConfirm = (hour) => {
    setSelectedDate(hour);
    hideDatePicker();
    const today = hour.toLocaleTimeString("en-US", {
      timeStyle: "short",
    });
    const currentTime = Object.assign({}, hoursRange);
    currentTime[id]["text"] = today;
    //  console.log(currentTime)
    //currentTime[item.id]['text'] = today
    setHoursRange(currentTime);
  };

  //새로시작
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  function printHour() {
    //object->string
    //object
    //console.log(selectedDate)
    const today = selectedDate.toLocaleTimeString("en-US", {
      timeStyle: "short",
    });
    //
    // passingtime(item, today)
    return `${today}`;
  }

  return (
    <View>
      <Text style={styles.title} onPress={showDatePicker}>
        {selectedDate ? printHour() : item.text}
        {item.id == 1 ? <Text> ~ </Text> : null}
      </Text>

      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="time"
        display="inline"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: "white",
    fontWeight: "300",
    fontFamily: "NanumSquareRoundB",
  },
});

export default TimePick;
