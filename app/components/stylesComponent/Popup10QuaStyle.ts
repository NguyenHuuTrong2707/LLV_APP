import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
        fontWeight: 'bold',
        lineHeight: 20,
        marginBottom: 5
    },
    titleContent: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 18,
        marginBottom: 5,
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
    },
    footerContainer: {
        width: 217,
    
    },
    paginationContainer: {
        flexDirection: 'row',
        width: 124,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    buttonPagi: {
        width: 29,
        height: 29,
        backgroundColor: '#FEFF0B',
        borderRadius: 29/2,
        alignItems: 'center',

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
        borderRadius: 20,
        textAlign: 'center',
        fontWeight: 'bold',
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
});
