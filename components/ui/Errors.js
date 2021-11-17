import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Errors = ({ errors }) => {
    return errors && <View style={styles.container}>
        <Text style={styles.text}>{errors}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#78678c",
        padding: 12,
        borderRadius: 10,
        marginVertical: 10
    },
    text: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    }
});

export default Errors
