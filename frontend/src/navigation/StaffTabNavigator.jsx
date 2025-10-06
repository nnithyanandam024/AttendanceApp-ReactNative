import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Staff/Home/HomeScreen';
import AttendanceScreen from '../screens/Staff/Explore/AttendanceScreen';
import ProfileScreen from '../screens/Staff/Profile/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const StaffTabNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Attendance') {
                        iconName = 'calendar-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Attendance" component={AttendanceScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    </NavigationContainer>
);

export default StaffTabNavigator;