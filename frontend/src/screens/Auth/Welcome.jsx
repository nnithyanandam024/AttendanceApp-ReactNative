import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Edvanta Attendance App!</Text>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Welcome;