import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//Stacks
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import LoadingScreen from '../screens/ui/LoadingScreen'

//Actions
import { renew } from '../actions/authActions'
import { getTheme } from '../actions/themeActions'

//Hooks
import { useAuth, useTheme } from '../hooks'

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const dispatch = useDispatch();
    const { user, authenticated } = useAuth();
    const theme = useTheme();

    const [isCheking, setIsCheking] = useState(true);

    const init = async () => {     
        try {
            await Promise.all([
                dispatch(getTheme()),
                dispatch(renew())
            ]);
        } catch (error) {
            console.log(error)
        } finally {
            setIsCheking(false);
        }
    }

    useEffect(() => {
        init();
    }, []);

    if (isCheking) return <LoadingScreen />

    return (
        <NavigationContainer theme={theme}>
            <StatusBar
                backgroundColor={theme.colors.background}
                barStyle={theme.dark ? "light-content" : "dark-content"}
            />

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user && !authenticated
                    ? <Stack.Screen name="AuthStack" component={AuthStack} />
                    : <Stack.Screen name="AppStack" component={AppStack} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;