import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    cauHoiContainer: {
        width: 400,
        height: 200,
        backgroundColor: '#FFF',
        borderRadius: 12,
    },
    title: {
        fontFamily: 'SVN-Gotham',
        color: 'red',
        fontSize: 20,
    },
    txtCauHoi: {
        fontSize: 15,
    },
    cautraloi: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cautraloiWrap: {
        width: '45%',
        margin: 5,
    },
    circle:{
        width: 80,
        height: 80,
        backgroundColor: '#FFF',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent:'center'
    },
    time:{
        fontFamily: 'SVN-Gotham',
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'center',
        color: '#F5D77F'
    }
});
export default styles
