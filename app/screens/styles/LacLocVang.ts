import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    imgBackGround: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    contentContainer: {
        position: 'absolute',
        bottom: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    count: {
        fontSize: 16,
        color: "#333333",
        textAlign: 'center',
        fontWeight: 700,
        marginBottom: 5,
    },
    totalShakes: {
        fontSize: 24,
        lineHeight: 24,
        color: '#c2030b',
        fontWeight: 700,
    },
    button: {
        backgroundColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    noShakes: {
        fontSize: 16,
        color: "red",
        marginTop: 10,
    },

});
