import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bannerContainer: {
        width: 335,
        height: 600,
        marginTop: 20,
        flex: 1,
        alignItems: 'center'
    },
    title: {
     fontFamily: 'SVN-Cookies',
     marginTop  : 10,
     textAlign: 'center',
     color: '#FAD93C'
    },
    imgGiaiNhi: {
        position: 'absolute',
        top: 135,
        left: 30,
        width: 52,
        height: 48,
    },
    txtGiaiNhi: {
        position: 'absolute',
        top: 195,
        left: 10,
        width: 102,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700',
        fontSize: 10,
        lineHeight: 15,
        fontFamily: 'SVN-Gotham'
    },
    titleGiaiNhi: {
        position: 'absolute',
        top: 100,
        left: 10,
        width: 102,
        textAlign: 'center',
        color: '#FAD93C',
        fontWeight: 700,
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'SVN-Gotham'
    },
    imgGiaiNhat: {
        position: 'absolute',
        top: 80,
        left: 140,
        width: 56,
        height: 49,
    },
    txtGiaiNhat: {
        position: 'absolute',
        top: 170,
        left: 115,
        width: 102,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700',
        fontSize: 10,
        lineHeight: 15,
        fontFamily: 'SVN-Gotham'
    },
    titleGiaiNhat: {
        position: 'absolute',
        top: 45,
        left: 115,
        textAlign: 'center',
        color: '#FAD93C',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 19,
        fontFamily: 'SVN-Gotham'
    },
    imgGiaiBa: {
        position: 'absolute',
        top: 135,
        right: 40,
        width: 34,
        height: 38,
    },
    txtGiaiBa: {
        position: 'absolute',
        top: 195,
        right: 10,
        width: 102,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700',
        fontSize: 10,
        lineHeight: 15,
        fontFamily: 'SVN-Gotham'
    },
    titleGiaiBa: {
        position: 'absolute',
        top: 100,
        right: 10,
        width: 102,
        textAlign: 'center',
        color: '#FAD93C',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'SVN-Gotham'
    },
    vong1Container: {
        position: 'absolute',
        flexDirection: 'column',
        top: 420,
        right: 45,
        alignItems: 'center'
    },
    imgVong1: {
        width: 84,
        height: 124,
    },
    txtVong: {
        textAlign: 'center',
        width: 84,
        color: '#FFE933',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily : 'SVN-Cookies'
    },
    vong2Container: {
        position: 'absolute',
        flexDirection: 'column',
        top: 300,
        left: 45,
        alignItems: 'center'
    },
    imgVong2: {
        width: 100,
        height: 141,
    },
    chungKetContainer: {
        position: 'absolute',
        flexDirection: 'column',
        top: 230,
        right: 45,
        alignItems: 'center'
    },
    imgChungKet: {
        width: 137,
        height: 108,
    },
    txtChungKet : {
        fontSize: 13,
        lineHeight: 15,
        textAlign: 'center',
        fontWeight: '700',
        color: '#F5D77F',
        paddingTop : 5,
        fontFamily: 'SVN-Gotham'
    }
});
