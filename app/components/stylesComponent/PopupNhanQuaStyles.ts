import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
    },
    img: {
        width: 316,
        height: 347,
        alignItems: 'center',
    },
    logo: {
        width: 136,
        height: 38,
    },
    contentContainer: {
        position: 'absolute',
        top: 100,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        color: '#C2030B',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 20,
        fontFamily: 'SVN-Cookies'
    },
    imgQuaContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        gap : 30,
        alignItems:'center'
    },
    imgQua: {
        width: 55,
        height: 49,
    },
    imgGiftCode: {
        width: 97,
        height: 52,
        justifyContent: 'center'
    },
    giftcode: {
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 'bold',
    },
    content: {
        textAlign: 'center',
        color: '#C2030B',
        fontSize: 11,
        fontWeight: 'bold',
        lineHeight: 18,
    },
    footerContainer: {
        width: 198,
    },
    closeButton: {
        position: 'relative',
        left: 130,
        top: 40,
        zIndex  :10
    },
    close :{
        width: 32.5,
        height: 34.12
    }
});
export default styles