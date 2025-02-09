import { Stack } from 'expo-router';
import BottomNavigation from "./navigation/BottomNavigation";
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="index" />  
  <Stack.Screen name="home" />   
</Stack>
}
