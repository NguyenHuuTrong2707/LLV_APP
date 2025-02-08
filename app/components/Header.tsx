import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from '../components/stylesComponent/HeaderStyle'

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
interface HeaderProps {
  title?: string
  titleImage?: any
  imageHelp?: any
}

const Header: React.FC<HeaderProps> = ({ title, titleImage, imageHelp }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    else {
      console.log("Khong co trang o truoc")
    }
  }
  return (
    <View style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Image source={require("../../assets/images/backbutton.png")} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
      {/* Tiêu đề có thể là chữ hoặc hình ảnh */}
      {titleImage ? (
        <Image source={titleImage} style={styles.titleImage} resizeMode="contain" />
      ) : (
        <Text style={styles.titleText}>{title}</Text>
      )}
      </View>
      {/* Button Help */}
      <TouchableOpacity style = {styles.helpButton} >
        <Image source={imageHelp} style={styles.helpIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
