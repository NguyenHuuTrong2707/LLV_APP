import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Page_BanKet from "../screens/BanKet";
import Page_Vong1 from "../screens/Vong1"; 
import Page_ThanhLiXi from "../screens/ThanhLiXi";

const Stack = createNativeStackNavigator();

export default function BanKetStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BanKetScreen" component={Page_BanKet} />
      <Stack.Screen name="Vong1" component={Page_Vong1} />
      <Stack.Screen name="ThanhLiXi" component={Page_ThanhLiXi} />
    </Stack.Navigator>
  );
}
