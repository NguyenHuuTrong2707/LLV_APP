import { StyleSheet, Dimensions } from "react-native";
import { Platform } from "react-native";
// Lấy chiều cao và chiều rộng của màn hình
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    imgbg: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        paddingVertical: 10,
        fontSize: 20,
        lineHeight: 30,
        color: '#FFE933',
        fontFamily: 'SVN-Gotham',
        fontWeight: '700'
    },
    txtLoad: {
        fontSize: 16,
        lineHeight: 20,
        color: '#FFF',
        fontFamily: 'SVN-Gotham',
    },
    avt: {
        width: 180,
        height: 188,
        position: 'absolute',
        top: height * 0.25,  
        marginBottom: 30
    },
    txtUserName: {
        width: 120,
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'SVN-Cookies',
        color: '#FFE995',
    },
    containerUsername:{
        position: 'absolute',
        top: height * 0.46,  
    },
    txtTime: {
        fontSize: 24,
        lineHeight: 30,
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',
        color: '#F5D77F',
       
    },
    containerTime:{
        position: 'absolute',
        top: Platform.OS === "ios" ? height * 0.59 : height * 0.55 , 
    },
    note: {
        width: 294,
        height: 66,
        position: 'absolute',
        bottom: height * 0.1,  
        alignSelf: 'center'
    }
});

export default styles;
