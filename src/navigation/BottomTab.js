import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
//import HomeScreen from "../screens/HomeScreen";
import MyRoutineScreen from "../screens/MyRoutineScreen";
import MyPageScreen from "../screens/MyPageScreen";
import ScrapScreen from "../screens/ScrapScreen";
import { FontAwesome } from "@expo/vector-icons";
import MineScreen from "../screens/MineScreen";
//import HomeTabNav from "./HomeTab";
import OtherRoutineScreen from "../screens/OtherRoutineScreen";
import MineRoutineScreen from "../screens/MineRoutineScreen";
import HomeScreen from "../screens/HomeScreen";
import PopularScreen from "../screens/PopularScreen";
import NewScreen from "../screens/NewScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoginScreen from "../screens/LoginScreen";
import InitialScreen from "../screens/InitialScreen";
import SignupScreen from "../screens/SignupScreen";

const LoginStack = createNativeStackNavigator();
const LoginStackNav = () => {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Initial" component={InitialScreen} />
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="SignUp" component={SignupScreen} />
    </LoginStack.Navigator>
  );
};

//////////MyPage
const MyPageStack = createNativeStackNavigator();
const MyPageStackNav = () => {
  return (
    <MyPageStack.Navigator screenOptions={{ headerShown: false }}>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
      <MyPageStack.Screen name="Scrap" component={ScrapScreen} />
      <MyPageStack.Screen name="Mine" component={MineScreen} />
      <MyPageStack.Screen name="Mines" component={MineRoutineScreen} />
    </MyPageStack.Navigator>
  );
};

// const MyStack = createNativeStackNavigator();
// const MyStackNav = () => {
//   return (
//     <MyStack.Navigator screenOptions={{ headerShown: false }}>
//       <MyStack.Screen name="Home" component={HomeScreen} />
//       <MyStack.Screen name="new" component={NewScreen} />
//       <MyStack.Screen name="popular" component={PopularScreen} />
//       <MyStack.Screen name="Others" component={OtherRoutineScreen} />
//     </MyStack.Navigator>
//   );
// };

///// 탑 탭
const HomeTab = createMaterialTopTabNavigator();
const HomeTabNav = () => {
  return (
    <HomeTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "white",
        },
        tabBarItemStyle: { width: 100, height: 60 },
        swipeEnabled: false,
      }}
    >
      <HomeTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: ({ focused }) => (
            <Text style={focused ? styles.actTitle : styles.title}>홈</Text>
          ),
        }}
      />
      <HomeTab.Screen
        name="popular"
        component={PopularScreen}
        options={{
          title: ({ focused }) => (
            <Text style={focused ? styles.actTitle : styles.title}>인기</Text>
          ),
        }}
      />
      <HomeTab.Screen
        name="new"
        component={NewScreen}
        options={{
          title: ({ focused }) => (
            <Text style={focused ? styles.actTitle : styles.title}>신규</Text>
          ),
        }}
      />
    </HomeTab.Navigator>
  );
};

//// 제일 중심 스택
const MyStack = createNativeStackNavigator();
const MyHomeStack = createNativeStackNavigator();
const MyHomeStackNav = () => {
  return (
    <MyHomeStack.Navigator>
      <MyHomeStack.Screen
        name="HomeTab"
        component={HomeTabNav}
        options={{
          headerTitle: () => (
            <View style={styles.container}>
              <Image
                style={{ height: 25, width: 25 }}
                source={require("../../assets/images/logo.png")}
              />
              <Text style={styles.ttitle}>GOD[T] Morning</Text>
            </View>
          ),
          title: "GOD[T] Morning",
        }}
      />
      <MyStack.Screen
        name="Others"
        component={OtherRoutineScreen}
        options={{ headerShown: false }}
      />
    </MyHomeStack.Navigator>
  );
};

/////////Bottom 탭
const BottomTab = createBottomTabNavigator();
const BottomTabNav = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "rgb(178, 171, 171)",
      }}
      initialRouteName="Home"
    >
      <BottomTab.Screen
        name="Home"
        component={MyHomeStackNav}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="MyRoutine"
        component={MyRoutineScreen}
        options={{
          title: "MyRoutine",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus" size={30} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyPageScreen"
        component={MyPageStackNav}
        options={{
          title: "MyPage",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={30} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    fontFamily: "NanumSquareRoundB",
    fontSize: 20,
    color: "#757575",
  },
  ttitle: {
    left: 10,
    color: "black",
    fontWeight: "600",
    fontSize: 18,
    fontFamily: "NanumSquareRoundB",
  },
  actTitle: {
    fontFamily: "NanumSquareRoundB",
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});

export { LoginStackNav, MyHomeStackNav, BottomTabNav, MyPageStackNav };
