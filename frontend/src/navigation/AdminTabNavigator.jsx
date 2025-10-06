import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Sample screens
function DashboardScreen() {
    return null;
}

function UsersScreen() {
    return null;
}

function SettingsScreen() {
    return null;
}

const Tab = createBottomTabNavigator();

export default function AdminTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Dashboard') {
                            iconName = 'dashboard';
                        } else if (route.name === 'Users') {
                            iconName = 'people';
                        } else if (route.name === 'Settings') {
                            iconName = 'settings';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Dashboard" component={DashboardScreen} />
                <Tab.Screen name="Users" component={UsersScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}