import React from 'react'
import { View, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button } from '@rneui/themed'
import style from './styles'
import color from '../../styles/colors'

const IMAGE = '../../assets/neat.png'

const SignInScreen = ({ navigation }) => {
    return (
        <View style={style.screen}>
            <Image style={style.image} source={require(IMAGE)} />
            <View style={style.container}>
                <Text style={style.title}>Registro</Text>
                <Input
                    placeholder="Nombre de Usuario"
                    autoCapitalize="none"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                />
                <Input
                    placeholder="Email"
                    autoCapitalize="none"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                />
                <Input
                    placeholder="Contraseña"
                    secureTextEntry
                    autoCapitalize="none"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                />

                <Button
                    title="Crear Cuenta"
                    type="outline"
                    onPress={() => navigation.navigate('Home')}
                    buttonStyle={style.button.container}
                    titleStyle={style.button.text}
                />
                <Button
                    title="Ingresa a tu cuenta"
                    type="clear"
                    onPress={() => navigation.navigate('SignIn')}
                    titleStyle={style.button.text}
                />
            </View>
        </View>
    )
}

export default SignInScreen
