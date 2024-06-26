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
import { getDatabase, ref, onValue, DataSnapshot } from 'firebase/database'
import { updateCryptoPortfolio } from '../../redux/slice/cryptoSlice'
import { Navigation } from '../../models'

const IMAGE = '../../assets/neat.png'

const SignInScreen: React.FC<{ navigation: Navigation }> = ({ navigation }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const clearFields = () => {
        setEmail('')
        setPassword('')
    }

    const readUserData = (userId: string) => {
        const db = getDatabase()
        const starCountRef = ref(db, 'users/' + userId)
        onValue(starCountRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val()
            dispatch(
                signIn({
                    ...data,
                })
            )
        })
    }

    const readUserPortfolio = (userId: string) => {
        const db = getDatabase()
        const starCountRef = ref(db, 'portfolios/' + userId)
        onValue(starCountRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val()
            const cryptoPortfolio = Object.values(data).flat()
            dispatch(updateCryptoPortfolio(cryptoPortfolio))
        })
    }

    const signInHandler = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser
            if (user) {
                readUserData(user.uid)
                readUserPortfolio(user.uid)
                navigation.navigate('Home')
            }
        } catch (error) {
            alert(
                `Error: ${error.code}. Por favor, intenta con otro correo electrónico o contraseña`
            )
            clearFields()
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
