import { Text, View } from "react-native";
import  Page_HuongDan  from './screens/HuongDan'
import { useFonts } from 'expo-font';
import { ActivityIndicator} from "react-native";
export default function Index() {
  const [fontsLoaded] = useFonts({
    'SVN-Cookie': require('../assets/fonts/SVN-Cookie.ttf'),
  });


  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <Page_HuongDan/>
  );
}
