import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
    button: {
        width: 179,
        height: 44,
        borderRadius: 15,
        borderColor: '#fbc402',
        borderWidth: 2,
        overflow: 'hidden',
        marginBottom: 10,
    
    },
    content: {
        textAlign: 'center',
        color: '#c2030b',
        fontWeight: 'bold',
        fontFamily: 'SVN-Cookies',
        fontSize: 16
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    disabledButton : {
        borderColor: '#a9a9a9',
    },
    disabledText :{
        color : '#FFF'
    }
});
export default styles