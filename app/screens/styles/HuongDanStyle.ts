import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
    banner: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',

    },
    imgContainer: {
        paddingTop: 50,
    },
    img1: {
        width: 414,
        height: 401,
    },
    img2: {
        width: 335,
        height: 151,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    content: {
        width: 254,
    },
    textContent: {
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 700,
        fontFamily :'SVN-Gotham'
    }
});
export default styles