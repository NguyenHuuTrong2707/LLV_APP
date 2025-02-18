import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
    banner: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    contentContainer: {
        position: 'absolute',
         zIndex: 10,
         top: 580,
         alignItems: 'center'
    },
    txtContent: {
        paddingVertical: 10,
        fontSize : 16,
        lineHeight:24,
        color: '#FFF',
        fontFamily: 'SVN-Gotham',
        fontWeight: 700
    }
});
export default styles
