import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    bg: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navTopContainer: {
        flexDirection: 'row',
        position: 'fixed',
        top: 30,
        zIndex: 10
    },
    tab: {
        height: 53,
        width: 105,
    },
    banner: {
        width: 360,
        height: 600,
        alignItems: 'center'
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 50,
        paddingHorizontal: 50
    },
    imgTop: {
        height: 126,
        width: 122,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgTop2: {
        height: 104,
        width: 125,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avtTop1: {
        width: 48,
        height: 39,
    },
    txtNameTop1: {
        position: 'absolute',
        top: 95,
        textAlign: 'center',
        lineHeight: 12,
        fontSize: 9,
        fontFamily: 'SVN-Gotham',
        color: '#FFF',
        width: 80
    },
    txtNameTop2: {
        position: 'absolute',
        top: 70,
        textAlign: 'center',
        lineHeight: 12,
        fontSize: 9,
        fontFamily: 'SVN-Gotham',
        color: '#333333',
        width: 80,
        paddingVertical: 2
    },
    bangXepHangContainer: {
        alignItems: 'center',
        gap: 10
    },
    xepHang1: {
        width: 323,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtContainer: {
        flexDirection: 'row',
        gap: 5,
        marginLeft: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtXepHang: {
        fontSize: 10,
        fontFamily: 'SVN-Gotham',
        lineHeight: 13,
        color: '#FFE933',
        flex: 1,
        marginLeft: 15
    },
    txtLiXi: {
        fontSize: 10,
        fontFamily: 'SVN-Gotham',
        lineHeight: 13,
        color: '#FFFF',

    },
    imgavt1: {
        width: 20,
        height: 17,
        position: 'absolute',
        left: 70
    },
    xepHangCuaToi: {
        width: 323,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    hangCuaToi: {
        width: 87,
        height: 21,
        position: 'fixed',
        top: 10,
        zIndex: 10
    },
    scoreTop: {
        position: 'absolute',
        left: -60,
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 15,
        color: '#FFE933',
        fontFamily: 'SVN-Gotham'
    }
});
export default styles
