import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BanKet from "../screens/BanKet";  
import Page_LacLocVang from "../screens/LacLocVang"; 
import Page_KhoLoc from "../screens/KhoLoc";
import { styles } from '../navigation/styleNavigation/BottomStyle';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() { 
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.label,
          headerShown: false,
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
            
          }}
        />
        <Tab.Screen
          name="LiXiVang"
          component={BanKet}
          options={{
            tabBarIcon: () => (
              <Image source={require("../../assets/images/lixiIcon.png")} style={styles.icon} />
            ),
            tabBarLabel: "Lì Xì Vàng",
           
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
          }}
        />
      </Tab.Navigator>
  );
}
