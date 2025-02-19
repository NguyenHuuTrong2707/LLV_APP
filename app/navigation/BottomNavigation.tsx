import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Page_LacLocVang from "../screens/LacLocVang"; 
import Page_KhoLoc from "../screens/KhoLoc";
import styles from "../navigation/styleNavigation/BottomStyle"; 
import BanKetStack from "./BanKetStack";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        headerShown: false,
        tabBarItemStyle: styles.tabarItem,
      }}
    >
      <Tab.Screen
        name="LacLocVang"
        component={Page_LacLocVang}
        options={{
          tabBarIcon: () => (
            <Image source={require("../../assets/images/phoneIcon.png")} style={styles.icon} />
          ),
          tabBarLabel: "Lắc Lộc Vàng",
          tabBarActiveBackgroundColor: "#FFD233",
        }}
      />
      <Tab.Screen
        name="LiXiVang"
        component={BanKetStack}
        options={{
          tabBarIcon: () => (
            <Image source={require("../../assets/images/lixiIcon.png")} style={styles.icon} />
          ),
          tabBarLabel: "Lì Xì Vàng",
          tabBarActiveBackgroundColor: "#FFD233",
        }}
      />
      <Tab.Screen
        name="KhoLoc"
        component={Page_KhoLoc}
        options={{
          tabBarIcon: () => (
            <Image source={require("../../assets/images/khoLocIcon.png")} style={styles.icon} />
          ),
          tabBarLabel: "Kho Lộc",
          tabBarActiveBackgroundColor: "#FFD233",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
