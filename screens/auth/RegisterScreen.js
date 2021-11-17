import React from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

//Actions
import { register } from '../../actions/authActions'

//Hooks
import { useAuth, useTheme, useForm } from '../../hooks'

//Componets
import Errors from '../../components/ui/Errors'

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading, errors } = useAuth();
    const theme = useTheme();

    const { values: user, handleChange } = useForm({
        email: "",
        password: ""
    });

    const handleSubmit = () => {
        dispatch(register(user));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>

            <View>
                <Errors errors={errors} />

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#78678c"
                    style={{ ...styles.textInput, color: theme.colors.text }}
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    onChangeText={text => handleChange("email", text)}
                />

                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#78678c"
                    style={{ ...styles.textInput, color: theme.colors.text }}
                    textContentType="password"
                    secureTextEntry
                    onChangeText={text => handleChange("password", text)}
                />

                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text
                        style={styles.buttonLoginText}
                    >{ loading ? "Cargando..." : "Registrarse" }
                    </Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text
                    style={styles.textForgotPassword}
                    onPress={() => { navigation.navigate("LoginScreen") }}
                >¿Ya tenes cuenta? Inicia Sesión
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "space-between", marginTop: 30 },
    title: { fontSize: 30, textAlign: "center", fontWeight: "bold", color: "#78678c" },
    buttonLogin: { backgroundColor: "#78678c", padding: 15, borderRadius: 10, marginVertical: 10 },
    buttonLoginText: { fontSize: 18, fontWeight: "bold", textAlign: "center", color: "white" },
    textInput: { borderColor: "#78678c", borderWidth: 2, marginVertical: 10, padding: 14, borderRadius: 10 },
    textForgotPassword: { color: "#78678c", fontSize: 16, fontWeight: "bold", marginVertical: 10, textAlign: "center" }
});

export default RegisterScreen
