import { Text, View } from "react-native";
import  Page_HuongDan  from './screens/HuongDan'
import  LoginScreen from './Login'
import { useFonts } from 'expo-font';
import { ActivityIndicator} from "react-native";
export default function Index() {
  const [fontsLoaded] = useFonts({
    'SVN-Cookies': require('../assets/fonts/SVN-Cookies.ttf'),
  });


  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <LoginScreen/>
  );
}
