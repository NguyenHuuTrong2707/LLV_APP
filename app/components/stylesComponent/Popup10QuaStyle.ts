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
        width: 347,
        height: 538,
        alignItems: 'center',
    },
    logo: {
        width: 136,
        height: 38,
    },
    contentContainer: {
        position: 'absolute',
        top: 180,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        color: '#FFE933',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 20,
        marginBottom: 5,
        fontFamily: 'SVN-Cookies'
    },
    titleContent: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18,
        fontFamily: 'SVN-Gotham'
        
    },
    imgQuaContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        gap: 30,
        alignItems: 'center'
    },
    imgQua: {
        width: 55,
        height: 49,
    },
    imgGiftCode: {
        width: 97,
        height: 52,
        justifyContent: 'center',
        
    },
    giftcode: {
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 'bold',
    },
    content: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 12,
        fontWeight: 700,
        lineHeight: 15,
        fontFamily: 'SVN-Gotham'
    },
    footerContainer: {
        width: 217,
    
    },
    paginationContainer: {
        flexDirection: 'row',
        width: 124,
        height: 29,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonPagi: {
        width: 29,
        height: 29,
        backgroundColor: '#FEFF0B',
        borderRadius: 29/2,

    },
    pageIndicator: {
        color: '#FFE933',
        fontSize: 12,
        fontWeight: 700,
        lineHeight: 18
    },
    pageButtonText: {
        color: '#BC000E',
        fontSize: 17.67,
        textAlign: 'center',
        fontWeight: 700,
        fontFamily : 'SVN-Cookies'
    },
    buttonDisabled :{
        backgroundColor: '#C0C0C0',
    },
    textDisabled :{
        color: '#FFF',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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