import { StyleSheet } from "react-native";
import { Platform } from "react-native";
const styles = StyleSheet.create({
    banner: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 20 : 0
    },
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        color: '#C4040B',
        fontFamily: 'SVN-Gotham',
        fontSize: 20,
        lineHeight: 30,
        position: 'absolute',
        top: 150,
        textAlign: 'center'
    },
    content: {
        color: '#333333',
        fontFamily: 'SVN-Gotham',
        fontSize: 14,
        lineHeight: 18,
        position: 'absolute',
        top: 180,
        textAlign: 'center'
    },
    avt1Container: {
        flexDirection: 'column',
        gap: 5,
        position: 'absolute',
        top: 280,
        left: 60,
        alignItems: 'center'
    },
    avt2Container: {
        flexDirection: 'column',
        gap: 5,
        position: 'absolute',
        top: 280,
        right: 60,
        alignItems: 'center',
    },
    face: {
        width: 81,
        height: 85
    },
    username: {
        color: '#C4040B',
        textAlign: 'center',
        fontFamily: 'SVN-Cookies',
        lineHeight: 18,
        width: 75
    },
    username2: {
        color: '#FFCF03',
        textAlign: 'center',
        fontFamily: 'SVN-Cookies',
        lineHeight: 18,
        width: 75
    },
    button: {
        position: 'absolute',
        top: 550
    },
    timeContainer: {
        position: 'absolute',
        top: 470
    },
    time: {
        fontFamily: 'SVN-Gotham',
        fontSize: 24,
        lineHeight: 30,
        textAlign: 'center',
        color: '#F5D77F'
    }
});
export default styles
