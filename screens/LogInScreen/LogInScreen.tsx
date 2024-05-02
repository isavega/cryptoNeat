import React from "react";
import { View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "@rneui/themed";
import style from "./styles";
import color from "../../styles/colors";

const LogInScreen = (props) => {
  return (
    <View style={style.screen}>
      <View style={style.container}>
        <Text style={style.title}>Iniciar Sesión</Text>
        <Input
          placeholder="Email"
          rightIcon={<Icon name="user" size={24} color={color.green} />}
          autoCapitalize="none"
          inputContainerStyle={style.inputContainer}
          inputStyle={style.inputText}
        />
        <Input
          placeholder="Contraseña"
          rightIcon={<Icon name="lock" size={24} color={color.green} />}
          secureTextEntry
          autoCapitalize="none"
          inputContainerStyle={style.inputContainer}
          inputStyle={style.inputText}
        />

        <Button
          title="Ingresar"
          type="outline"
          buttonStyle={style.button.container}
          titleStyle={style.button.text}
        />
      </View>
    </View>
  );
};

export default LogInScreen;
