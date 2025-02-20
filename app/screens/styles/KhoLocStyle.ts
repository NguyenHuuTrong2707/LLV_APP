import { StyleSheet } from 'react-native';

 const styles = StyleSheet.create({
    imgBackGround: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 40,
        color: '#FFF9D1',
        lineHeight: 33,
        fontFamily: 'SVN-Cookies'
    },
    logoContainer: {
        paddingVertical: 10
    },
    logo: {
        width: 104,
        height: 31,
    },
    frame: {
        width: 335,
        height: 510,

    },
    quabg: {
        width: 96,
        height: 155,
        alignItems: 'center',
        padding: 5,
    },
    giftContainer: {
        marginBottom: 15,
    },
    giftImage: {
        width: 65,
        height: 65,
        resizeMode: 'contain'
    },
    giftInfo: {
        flex: 1,
    },
    giftName: {
        fontSize: 10,
        fontWeight: 700,
        color: "#732F2F",
        textAlign: 'center',
        lineHeight: 13,
        fontFamily: 'SVN-Gotham'
    },
    countContainer: {
        alignItems: 'center',
    },
    count: {
        color: '#732F2F',
        fontSize: 10,
        lineHeight: 13,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    phanloaiContainer: {
        width: 335,
        height: 52,
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 10,
    },
    navContainer: {
        height: 40,
        width: 95,
        borderRadius: 6,
        justifyContent: 'center',

    },
    txtLLV: {
        textAlign: 'center',
        color: '#c2030a',
        fontFamily: 'SVN-Cookies',
        fontSize: 12
    },
    giftcode: {
        textAlign: 'center',
        fontSize: 10,
        width: 47,
        fontWeight: 'bold',
    },
    imgGiftCode: {
        width: 74,
        height: 43,
        flex: 1,
        alignItems: 'center',
        padding: 9,
        position: 'relative',
        top: 10,
    },
    imgGiftContainer: {
        width: 96,
        height: 155,
        alignItems: 'center',
        padding: 10,
    },
    txtDaNhan: {
        color: '#2e8718'
    },
    txtChuaNhan: {
        color: '#c2030b'
    },
    countGiftChuaNhan :{
        textAlign :'center',
        paddingVertical: 10,
        fontFamily: 'SVN-Gotham',
        fontSize: 12,
        color: '#732f2f',
        lineHeight: 24
    },
    
});
export default styles