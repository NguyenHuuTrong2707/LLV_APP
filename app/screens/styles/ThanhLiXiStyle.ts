import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#a60006',
    },
    contentContainer: {
        width: 335,
        height: 593,
        alignItems: 'center',
        marginTop: 30
    },
    title: {
        paddingVertical: 10,
        fontSize: 20,
        lineHeight: 30,
        color: '#C2030B',
        fontFamily: 'SVN-Gotham',
        fontWeight: 700
    },
    missionContainer: {
        width: 331,
        height: 75,
        backgroundColor: '#0000001A',
        padding: 10,
        paddingLeft: 20,
        gap: 5,
        marginBottom: 20
    },
    txtNhiemVu: {
        color: '#C2030B',
        fontSize: 16,
        fontFamily: 'SVN-Gotham',
        lineHeight: 19
    },
    txtMission: {
        fontSize: 12,
        lineHeight: 15,
        color: '#333333',
    },
    minibanner: {
        width: 303,
        height: 204,
        marginBottom: 30
    },
    noteContainer: {
        width: 294,
        height: 78,
        backgroundColor: '#b1050b',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#fff613',
        marginTop: 30,
        paddingTop: 10,
        alignItems: 'center'
    },
    txtNote: {
        color: '#FFF',
        textAlign :'center'
    },
    highLight: {
        color: 'yellow'
    }
});
export default styles
