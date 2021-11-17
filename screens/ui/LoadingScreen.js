import React from 'react'
import { View, ActivityIndicator, StyleSheet, StatusBar } from 'react-native'

//Hooks
import { useTheme } from '../../hooks'

const LoadingScreen = () => {
    const theme = useTheme();
    
    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
            <StatusBar
                backgroundColor={theme.colors.background}
                barStyle={theme.dark ? "light-content" : "dark-content"}
            />

            <ActivityIndicator color={theme.colors.primary} size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",  
    }
});

export default LoadingScreen