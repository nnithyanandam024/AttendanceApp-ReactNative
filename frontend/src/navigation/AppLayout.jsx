import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';

// ==================== Auth Screens - Placeholder imports ====================
import Welcome from '../screens/Login/Welcome';
import Login from '../screens/Login/Login';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ActivityPlanner from '../screens/Student/Calendar/ActivityPlanner';
import MyAttendance from '../screens/Student/Explore/MyAttendance';
import MovementPass from '../screens/Student/Explore/MovementPass';
import TransportPass from '../screens/Student/Explore/TransportPass';

// ==================== Role-Based Navigation - Placeholder imports ====================
import AdminTabNavigator from './AdminTabNavigator';
import StaffTabNavigator from './StaffTabNavigator';
import StudentTabNavigator from './StudentTabNavigator';
import ParentTabNavigator from './ParentTabNavigator';

// ==================== Shared Screens - Placeholder imports ====================
// Uncomment these when you create shared screens across roles
// import AttendanceDetails from '../screens/Shared/AttendanceDetails';
// import ProfileSettings from '../screens/Shared/ProfileSettings';
// import Notifications from '../screens/Shared/Notifications';
// import ReportView from '../screens/Shared/ReportView';

const Stack = createStackNavigator();

const AppLayout = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            
            {/* ==================== Authentication Screens ==================== */}
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />

            {/* ==================== Admin Role Screens ==================== */}
            <Stack.Screen
              name="AdminDashboard"
              component={AdminTabNavigator}
              options={{ headerShown: false }}
            />

            {/* ==================== Staff Role Screens ==================== */}
            <Stack.Screen
              name="StaffDashboard"
              component={StaffTabNavigator}
              options={{ headerShown: false }}
            />

            {/* ==================== Student Role Screens ==================== */}
            <Stack.Screen
              name="StudentDashboard"
              component={StudentTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ActivityPlanner"
              component={ActivityPlanner}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyAttendance"
              component={MyAttendance}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MovementPass"
              component={MovementPass}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TransportPass"
              component={TransportPass}
              options={{ headerShown: false }}
            />


            {/* ==================== Parent Role Screens ==================== */}
            <Stack.Screen
              name="ParentDashboard"
              component={ParentTabNavigator}
              options={{ headerShown: false }}
            />

            {/* ==================== Shared/Common Screens ==================== */}
            {/* Uncomment these when you implement shared screens
            <Stack.Screen
              name="AttendanceDetails"
              component={AttendanceDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileSettings"
              component={ProfileSettings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ReportView"
              component={ReportView}
              options={{ headerShown: false }}
            />
            */}

          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default AppLayout;