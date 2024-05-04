import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Input, Button } from '@rneui/themed'
import style from './styles'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/auth'
import { signUp } from '../../redux/slice/authSlice'
import { useDispatch } from 'react-redux'

const IMAGE = '../../assets/neat.png'

const SignInScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState<string>('')

    const signUpHandler = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user
            dispatch(
                signUp({
                    isAuthenticated: true,
                    user: {
                        email: user.email,
                        uid: user.uid,
                        userName,
                    },
                })
            )
            user && navigation.navigate('Home')
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <View style={style.screen}>
            <Image style={style.image} source={require(IMAGE)} />
            <View style={style.container}>
                <Text style={style.title}>Registro</Text>
                <Input
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                    placeholder="Nombre de Usuario"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                />
                <Input
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                />
                <Input
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Contraseña"
                    secureTextEntry
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                />

                <Button
                    title="Crear Cuenta"
                    type="outline"
                    onPress={signUpHandler}
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
