import { StyleSheet } from "react-native";
import { Platform } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    logo: {
        width: 210,
        height: 60,
    },
    banner: {
        width: 335,
        height: 530,
        alignItems: 'center'
    },
    txtContainer: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'column',
        gap: 10
    },
    title: {
        color: '#C2030B',
        fontFamily: 'SVN-Gotham',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center'
    },
    content:{
        color: '#333333',
        fontSize: 14,
        lineHeight: 18,
        textAlign: 'center',
        width: 303
    },
   
});
export default styles
