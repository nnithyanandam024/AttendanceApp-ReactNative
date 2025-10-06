import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Keyboard, Platform, View } from 'react-native';

// ==================== Import Student Screens ====================
import StudentHome from '../screens/Student/Home/StudentHome.jsx';
import Explore from '../screens/Student/Explore/Explore';
import Scan from '../screens/Student/Scan/AttendenceMark.jsx';
import Calendar from '../screens/Student/Calendar/Calendar';
import Profile from '../screens/Student/Profile/Profile';

// ==================== Import SVG Icons ====================
// Default (inactive) icons
import HomeIcon from '../assets/Student/home.svg';
import ExploreIcon from '../assets/Student/explore.svg';
import ScanIcon from '../assets/Student/scan.svg';
import CalendarIcon from '../assets/Student/calendar.svg';
import ProfileIcon from '../assets/Student/profile.svg';

// Active (clicked) icons
import HomeActiveIcon from '../assets/Student/home-active.svg';
import ExploreActiveIcon from '../assets/Student/explore-active.svg';
import ScanActiveIcon from '../assets/Student/scan-active.svg';
import CalendarActiveIcon from '../assets/Student/calendar-active.svg';
import ProfileActiveIcon from '../assets/Student/profile-active.svg';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// ==================== Home Stack Navigator ====================
// Stack for Home tab to allow nested navigation
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="StudentHome"
        component={StudentHome}
        options={{ headerShown: false }}
      />
      {/* Add additional screens that should be accessible from Home
      <HomeStack.Screen 
        name="Notifications" 
        component={Notifications} 
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="AttendanceDetails" 
        component={AttendanceDetails} 
        options={{ headerShown: false }}
      /> */}
    </HomeStack.Navigator>
  );
};

// ==================== Custom Scan Button Component ====================
// This creates the centered elevated scan button
const ScanButton = ({ focused }) => {
  return (
    <View style={styles.scanButtonContainer}>
      <View style={[styles.scanButton, focused && styles.scanButtonActive]}>
        {focused ? (
          <ScanActiveIcon width={32} height={32} />
        ) : (
          <ScanIcon width={32} height={32} />
        )}
      </View>
    </View>
  );
};

// ==================== Student Tab Navigator ====================
const StudentTabNavigator = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Handle keyboard visibility to hide tab bar when keyboard is open
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          display: keyboardVisible ? 'none' : 'flex',
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#4F46E5', // Blue color for active state
        tabBarInactiveTintColor: '#9CA3AF', // Gray color for inactive state
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? HomeActiveIcon : HomeIcon;
            return <Icon width={24} height={24} />;
          },
        }}
      />

      {/* Explore Tab */}
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? ExploreActiveIcon : ExploreIcon;
            return <Icon width={24} height={24} />;
          },
        }}
      />

      {/* Scan Tab - Center elevated button */}
      <Tab.Screen
        name="Scan"
        component={Scan} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <ScanButton focused={focused} />,
        }}
      />

      {/* Calendar Tab */}
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? CalendarActiveIcon : CalendarIcon;
            return <Icon width={24} height={24} />;
          },
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? ProfileActiveIcon : ProfileIcon;
            return <Icon width={24} height={24} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

// ==================== Styles ====================
const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  // Styles for the center scan button
  scanButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Elevate the button above the tab bar
  },
  scanButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5', // Blue background
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scanButtonActive: {
    backgroundColor: '#4338CA', // Darker blue when active
  },
});

export default StudentTabNavigator;