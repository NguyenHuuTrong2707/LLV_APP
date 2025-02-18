import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    imgbg: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
      
    },
    title: {
        paddingVertical: 10,
        fontSize: 20,
        lineHeight: 30,
        color: '#FFE933',
        fontFamily: 'SVN-Gotham',
        fontWeight: 700
    },
    txtLoad:{
        fontSize: 16,
        lineHeight: 20,
        color: '#FFF',
        fontFamily: 'SVN-Gotham',
    },
    avt:{
        width: 180,
        height: 188,
        position: 'absolute',
        top: 250,
        marginBottom: 30
    },
    txtUserName:{
        width: 120,
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'SVN-Cookies',
        color: '#FFE995',
        position: 'absolute',
        top: 440,
    },
    txtTime:{
        fontSize: 24,
        lineHeight: 30,
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',
        color: '#F5D77F',
        position: 'absolute',
        top: 530,
    },
    note:{
        width: 294,
        height: 66,
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center'
    }

});
export default styles
