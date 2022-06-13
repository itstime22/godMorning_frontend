import { StyleSheet, View, TextInput } from "react-native";

const Title = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        placeholderTextColor={"gray"}
        placeholder="루틴 이름을 지어보세요!"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  title: {
    width: "100%",
    fontSize: 25,
    fontWeight: "500",
    padding: 20,
    marginHorizontal: 70,
    marginBottom: 10,
    fontFamily: "Cafe24Ohsquareair",
  },
});

export default Title;
