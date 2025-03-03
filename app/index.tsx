import { Text, View } from "react-native";
import Page_BangXepHang from "./screens/BangXepHang";
import  LoginScreen from './Login'
import { useFonts } from 'expo-font';
import { ActivityIndicator} from "react-native";
export default function Index() {
  const [fontsLoaded] = useFonts({
    'SVN-Cookies': require('../assets/fonts/SVN-Cookies.ttf'),
    'SVN_Gotham' :require('../assets/fonts/SVN-Gotham Black.otf')
  });


  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <LoginScreen/>
  );
}
