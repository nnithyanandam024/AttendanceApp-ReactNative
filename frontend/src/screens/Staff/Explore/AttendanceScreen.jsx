import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const AttendanceScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Attendance Screen</Text>
            <Text style={styles.subtitle}>Track and manage staff attendance here.</Text>
            <Button
                title="Go Back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 24,
    },
});

export default AttendanceScreen;