import { StyleSheet } from "react-native";
import appStyle from "../../styles/appStyle";
import color from "../../styles/colors";

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  cardContainer: {
    margin: 10,
    width: "40%",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: color.gray[200],
    marginBottom: 5,
  },
  title: {
    color: color.white,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
  },
  buttonGroupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 20,
  },
});

export default { ...appStyle, ...style };
