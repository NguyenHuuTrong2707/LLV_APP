import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    banner: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    contentContainer: {
        width: 335,
        height: 588,
        alignItems: 'center',
        marginTop: 50,
    },
    textWrapper: {
        alignItems: "center",
    },
    imageWrapper: {
        paddingVertical: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        paddingVertical: 10,
        fontSize: 20,
        lineHeight: 30,
        color: '#C4040B',
        fontFamily: 'SVN-Gotham',
        fontWeight: 700
    },
    txtNhiemVu: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 18,
        color: '#333333',
    },
    minibanner: {
        width: 335,
        height: 223,
    },
    noteContainer: {
        width: 294,
        height: 65,
        backgroundColor: '#b1050b',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#fff613',    
        paddingTop: 10,
        alignItems: 'center',
        gap: 5
    },
    txtNote: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 12
    },
   
});
export default styles
