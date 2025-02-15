import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  icon: {
    width: 29,  
    height: 29, 
  },
  label: {
    fontSize: 14,
    lineHeight :18,
    textAlign: 'center',
    color: '#C2030B',
    fontWeight: '400',
   fontFamily : 'SVN-Cookies'
  },
  
  tabBar: {
    height: 70, 
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12,
  },
});
