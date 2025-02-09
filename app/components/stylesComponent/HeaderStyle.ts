import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  backIcon: {
    width: 61,
    height: 52,
  },
  helpIcon: {
    width: 37,
    height: 36,
  },
  helpButton: {
    position: "absolute",
    right : 10
  },
  titleText: {
    fontSize: 24,
    color: "#C2030B",
    fontFamily: 'SVN-Cookie',
    
  },
  titleImage: {
    width: 120,
    height: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
