import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    banner: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    containerThachDau: {
        paddingVertical: 30,

        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    player: {
        width: 133,
        height: 66
    },
    imgVs: {
        width: 69,
        height: 50,
        marginTop: 30
    },
    user1Container: {
        gap: 7
    },
    name: {
        fontSize: 13,
        color: '#FFF',
        fontFamily: 'SVN-Cookies',
        textAlign: 'center',
        lineHeight: 17
    },
    face1: {
        width: 42,
        height: 33,
        position: 'fixed',
        top: 17,
        left: 7
    },
    correctUser1: {
        position: 'fixed',
        left: 70,
        top: 0,
        fontSize: 20,
        lineHeight: 30,
        color: '#FAD93C',
        fontWeight: 'bold'
    },
    face2: {
        width: 42,
        height: 33,
        position: 'fixed',
        top: 17,
        left: 85
    },
    correctUser2: {
        position: 'fixed',
        left: 30,
        top: 0,
        fontSize: 20,
        lineHeight: 30,
        color: '#FAD93C',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 21,
        lineHeight: 21,
        fontFamily: 'SVN-Gotham',
        color: '#FFF',
        paddingVertical: 10
    },
    bannerGame: {
        width: 335,
        height: 485,
        alignItems: 'center'
    },
    khungTime: {
        width: 113,
        height: 42,
        marginTop: 10,
        alignItems: 'center'
    },
    time: {
        position: 'fixed',
        top: 15,
        left: 5,
        fontSize: 12,
        color: '#FFE995',
        lineHeight: 18
    },
    imgKhoan:{
        width: 183,
        height: 229,
        position:'fixed',
        top: 90,
        right: 50
    }
});
export default styles
