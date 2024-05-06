import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Input, Button } from '@rneui/themed'
import style from './styles'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { signUp } from '../../redux/slice/userSlice'
import { useDispatch } from 'react-redux'
import { generateRandomNumber } from '../../utils/utils'
import { writeUserData } from '../../services/realtimeDatabase'
const IMAGE = '../../assets/neat.png'

const SignInScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState<string>('')
    const initialBalance = generateRandomNumber()

    const signUpHandler = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser
            await updateProfile(user, {
                displayName: userName,
            })

            writeUserData(user.uid, userName, email, initialBalance)

            const userPayload = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                balanceUSD: initialBalance,
            }

            dispatch(
                signUp({
                    ...userPayload,
                })
            )
            user && navigation.navigate('Home')
        } catch (error) {
            alert(
                `Error: ${error.code}. Por favor, intenta con otro correo electrónico`
            )
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
                    buttonStyle={style.buttonContainer}
                    titleStyle={style.buttonText}
                />
                <Button
                    title="Ingresa a tu cuenta"
                    type="clear"
                    onPress={() => navigation.navigate('SignIn')}
                    titleStyle={style.buttonText}
                />
            </View>
        </View>
    )
}

export default SignInScreen
