import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background : {
    flex :1 ,
  },
  container :{
    flex : 1,
    alignItems: 'center',
  },
  bannerContainer :{
     width :  335,
     height: 600,
     marginTop: 20,
     flex : 1,
  },
  imgGiaiNhi : {
    position: 'absolute',
    top: 135,
    left: 30,
    width:52,
    height: 48,
  },
  txtGiaiNhi :{
    position: 'absolute',
    top: 195,
    left: 10,
    width:102,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
    fontSize : 10,
    lineHeight: 15
  }
});
