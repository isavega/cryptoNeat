import { StyleSheet } from "react-native";
import appStyle from "../../styles/appStyle";
import color from "../../styles/colors";

const style = StyleSheet.create({
  container: {
    backgroundColor: color.blue[100],
    margin: 50,
    padding: 20,
    borderRadius: 20,
  },
  title: {
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "PTSansNarrowRegular",
  },

  inputContainer: {
    backgroundColor: color.gray[200],
    height: 50,
    width: "100%",

    padding: 10,

    borderRadius: 20,
  },

  inputText: {
    color: color.information.text,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "PTSansNarrowRegular",
  },
});

export default { ...appStyle, ...style };
