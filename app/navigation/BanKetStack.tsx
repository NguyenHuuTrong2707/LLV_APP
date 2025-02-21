import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Page_BanKet from "../screens/BanKet";
import Page_Vong1 from "../screens/Vong1"; 
import Page_ThanhLiXi from "../screens/ThanhLiXi";
import Page_Waiting from "../screens/Waiting";
import Page_TimDuocDoiThu from "../screens/TimDuocDoiThu";
import Page_CauDo from "../screens/CauDo";
const Stack = createNativeStackNavigator();

export default function BanKetStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BanKetScreen" component={Page_BanKet} />
      <Stack.Screen name="Vong1" component={Page_Vong1} />
      <Stack.Screen name="ThanhLiXi" component={Page_ThanhLiXi} />
      <Stack.Screen name="Wating" component={Page_Waiting} />
      <Stack.Screen name="TimDuocDoiThu" component={Page_TimDuocDoiThu} />
      <Stack.Screen name="CauDo" component={Page_CauDo} />
    </Stack.Navigator>
  );
}
