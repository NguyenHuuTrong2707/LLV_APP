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
        width: 345,
        height: 205,
        borderRadius: 10,
    },
    button: {
        position: 'absolute',
        top: 150,
        left: 80,
    },
});
export default styles