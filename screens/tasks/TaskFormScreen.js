import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

//Actions
import { createTask, updateTask } from '../../actions/taskActions'

//Hooks
import { useTasks, useTheme, useForm } from '../../hooks'

//Componets
import Errors from '../../components/ui/Errors'

const TaskFormScreen = ({ navigation, route }) => {
    const taskData = route.params ? route.params.task : null;

    const dispatch = useDispatch();
    const { loading, redirectTo, errors } = useTasks();
    const theme = useTheme();

    const { values: task, handleChange } = useForm({
        name: taskData?.name || "",
        description: taskData?.description || ""
    });

    const handleSubmit = () => {
        if(taskData) {
            dispatch(updateTask(taskData._id, task));    
        } else {
            dispatch(createTask(task));
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: taskData ? taskData.name : "Nueva Tarea",
        });

        if(redirectTo !== null) {
            navigation.navigate(redirectTo)
        }
    }, [redirectTo]);

    return (
        <View style={styles.container}>
            <Errors errors={errors} />
            
            <TextInput
                placeholder="Nombre"
                placeholderTextColor="#78678c"
                style={{ ...styles.textInput, color: theme.colors.text }}
                onChangeText={text => handleChange("name", text)}
                value={task.name}
            />

            <TextInput
                placeholder="Descripción"
                placeholderTextColor="#78678c"
                style={{ ...styles.textInput, color: theme.colors.text }}
                onChangeText={text => handleChange("description", text)}
                value={task.description}
            />

            <TouchableOpacity
                style={styles.buttonTask}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text
                    style={styles.buttonTaskText}
                >{loading ? "Cargando..." : taskData ? "Editar" : "Ingresar"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, marginTop: 10 },
    buttonTask: { backgroundColor: "#78678c", padding: 15, borderRadius: 10, marginVertical: 10 },
    buttonTaskText: { fontSize: 18, fontWeight: "bold", textAlign: "center", color: "white" },
    textInput: { borderColor: "#78678c", borderWidth: 2, marginVertical: 10, padding: 14, borderRadius: 10 }
});

export default TaskFormScreen
