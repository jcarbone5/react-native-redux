import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { actions } from './actionsTask'

//Actions
import {
    getTasks,
    toggleTask,
    deleteTask,
    setSelectedTask,
    removeSelectedTask
} from '../../actions/taskActions'

//Hooks
import { useTasks, useTheme } from '../../hooks'

//Screen
import LoadingScreen from '../../screens/ui/LoadingScreen'

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { tasks, selectedTask, loading } = useTasks();
    const theme = useTheme();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Tareas",
            headerRight: () => <Text
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("TaskFormScreen")}
            >Nueva Tarea</Text>
        });
    }, []);

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    if (loading) return <LoadingScreen />

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.cardTask}
                onPress={() => dispatch(setSelectedTask(item))}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...styles.textName, color: theme.colors.text }}>{item.name}</Text>
                    <Text style={{ ...styles.textDescription, color: theme.colors.text }}>{item.description}</Text>
                </View>

                <TouchableOpacity style={styles.buttonDone}>
                    <Text
                        style={styles.buttonDoneText}
                        onPress={() => dispatch(toggleTask(item))}
                    >{item.done ? "Completada" : "Pendiente"}
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    const onPressItem = name => {
        switch (name) {
            case "editTask":
                navigation.navigate("TaskFormScreen", { task: selectedTask });

                break;

            case "deleteTask":
                dispatch(deleteTask(selectedTask._id));

                break;

            case "cancel":
                dispatch(removeSelectedTask());

                break;

            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            { tasks.length > 0 ?
                <>
                    <FlatList
                        data={tasks}
                        keyExtractor={item => item._id}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={{ marginBottom: 20 }} />}
                        showsVerticalScrollIndicator={false}
                    />

                    { selectedTask &&
                        <FloatingAction
                            actions={actions}
                            color={theme.colors.primary}
                            showBackground={false}
                            onPressItem={onPressItem}
                        />
                    }
                </>
            :
                <Text style={{ color: theme.colors.text }}>No hay tareas</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, marginTop: 10 },
    buttonNewTask: { color: "white", backgroundColor: "#78678c", borderRadius: 10, padding: 5, paddingHorizontal: 10, textAlign: "center" },
    cardTask: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 15, borderRadius: 10, borderWidth: 2, borderColor: "#78678c" },
    textName: { fontSize: 18, fontWeight: "bold" },
    textDescription: { fontSize: 16, fontWeight: "500" },
    buttonDone: { backgroundColor: "#78678c", borderRadius: 10, padding: 5, paddingHorizontal: 10 },
    buttonDoneText: { color: "white" },
    dataSheet: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20 },
    textSheet: { fontSize: 20, fontWeight: "500", marginVertical: 8 }
});

export default HomeScreen
