import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
    // Sample user data
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Staff',
        avatar: 'https://i.pravatar.cc/150?img=3',
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.role}>{user.role}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 24,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    role: {
        fontSize: 16,
        color: '#888',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfileScreen;