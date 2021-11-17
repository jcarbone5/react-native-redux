import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

//Screens
import HomeScreen from '../screens/tasks/HomeScreen'
import TaskFormScreen from '../screens/tasks/TaskFormScreen'
import ProfileScreen from '../screens/user/ProfileScreen'

//Hooks
import { useTheme } from '../hooks'

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TaskStack = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: true, 
                headerShadowVisible: false,
                headerStyle: { backgroundColor: theme.colors.background }
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="TaskFormScreen" component={TaskFormScreen} />
        </Stack.Navigator>
    )
}

const UserStack = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShadowVisible: false,
                headerStyle: { backgroundColor: theme.colors.background }
            }}
        >
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

const AppStack = () => {
    const theme = useTheme();
    
    return (
        <Tabs.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { elevation: 0, borderTopWidth: 0, height: 70, backgroundColor: theme.colors.background },
            tabBarActiveTintColor: "#78678c",
            tabBarInactiveTintColor: "#a094ae",
            
        }}> 
            <Tabs.Screen name="TaskStack" component={TaskStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={28} />
                )
            }} />
            <Tabs.Screen name="UserStack" component={UserStack} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={28} />
                )
            }} />
        </Tabs.Navigator>
    )
}

export default AppStack
