import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button } from '@rneui/themed'
import style from './styles'
import color from '../../styles/colors'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/slice/userSlice'
import { getDatabase, ref, onValue } from 'firebase/database'

const IMAGE = '../../assets/neat.png'

const SignInScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const readUserData = (userId) => {
        const db = getDatabase()
        const starCountRef = ref(db, 'users/' + userId)
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            dispatch(
                signIn({
                    ...data,
                })
            )
        })
    }

    const signInHandler = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser
            readUserData(user.uid)
            user && navigation.navigate('Home')
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <View style={style.screen}>
            <Image style={style.image} source={require(IMAGE)} />
            <View style={style.container}>
                <Text style={style.title}>Iniciar Sesión</Text>
                <Input
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    rightIcon={
                        <Icon name="user" size={24} color={color.green} />
                    }
                    autoCapitalize="none"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                />
                <Input
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Contraseña"
                    rightIcon={
                        <Icon name="lock" size={24} color={color.green} />
                    }
                    secureTextEntry
                    autoCapitalize="none"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                />

                <Button
                    title="Ingresar"
                    type="outline"
                    onPress={signInHandler}
                    buttonStyle={style.buttonContainer}
                    titleStyle={style.buttonText}
                />
                <Button
                    title="Crear Cuenta"
                    type="clear"
                    onPress={() => navigation.navigate('SignUp')}
                    titleStyle={style.buttonText}
                />
            </View>
        </View>
    )
}

export default SignInScreen
