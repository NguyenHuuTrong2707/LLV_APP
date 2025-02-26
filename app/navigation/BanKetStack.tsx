import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Page_BanKet from "../screens/BanKet";
import Page_Vong1 from "../screens/Vong1"; 
import Page_ThanhLiXi from "../screens/ThanhLiXi";
import Page_Waiting from "../screens/Waiting";
import Page_TimDuocDoiThu from "../screens/TimDuocDoiThu";
import Page_CauDo from "../screens/CauDo";
import Page_Winner from "../screens/Winner";
import Page_Vong2 from "../screens/Vong2";
import Page_BanVit from "../screens/BanVit";
import Page_ThuTaiBanVit from "../screens/ThuTaiBanVit";
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
      <Stack.Screen name="Winner" component={Page_Winner} />
      <Stack.Screen name="Vong2" component={Page_Vong2} />
      <Stack.Screen name="BanVit" component={Page_BanVit} />
      <Stack.Screen name="ThuTaiBanVit" component={Page_ThuTaiBanVit} />
    </Stack.Navigator>
  );
}
