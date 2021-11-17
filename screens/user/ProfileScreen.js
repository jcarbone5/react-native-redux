import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native'

//Actions
import { logout } from '../../actions/authActions'
import { darkTheme, defaultTheme } from '../../actions/themeActions'

//Hooks
import { useAuth, useTheme } from '../../hooks'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const theme = useTheme();

    const handleLogout = () => {
        return Alert.alert("Cerrar sesión", "¿Seguro que queres cerrar la sesión?",
            [{ text: "Si", onPress: () => dispatch(logout())}, { text: "No", }]
        );
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Perfil",
            headerRight: () => <Text 
                style={styles.buttonLogout} 
                onPress={handleLogout}
            >Cerrar sesión</Text>
        });
    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.userImage}
                source={{ uri: "https://www.joyonlineschool.com/static/emptyuserphoto.png" }}
            />

            <Text style={styles.title}>{user.email}</Text>

            <TouchableOpacity
                onPress={() => theme.dark ? dispatch(defaultTheme()) : dispatch(darkTheme())}
            >
                <Text 
                    style={{ ...styles.buttonLogout, paddingHorizontal: 20, paddingVertical: 10, fontSize: 16 }}
                >{ theme.dark ? "Default" : "Dark" }</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 20, textAlign: "center", fontWeight: "bold", color: "#78678c", marginBottom: 25 },
    buttonLogout: { color: "white", backgroundColor: "#78678c", borderRadius: 10, padding: 5, paddingHorizontal: 10 },
    userImage: { height: 120, width: 120, borderRadius: 60, marginBottom: 25 },
});

export default ProfileScreen
