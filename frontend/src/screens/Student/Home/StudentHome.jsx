import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// PLACEHOLDER: Import your SVG components here
// import CheckmarkIcon from './assets/CheckmarkIcon';
// import UserIcon from './assets/UserIcon';

const StudentHome = () => {
  // BACKEND INTEGRATION: State for user data
  const [userData, setUserData] = useState({
    name: 'User',
    // Add more user fields as needed
  });

  // BACKEND INTEGRATION: State for pending actions/notifications
  const [pendingActions, setPendingActions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // BACKEND INTEGRATION: Fetch user data and pending actions
  useEffect(() => {
    fetchUserData();
    fetchPendingActions();
  }, []);

  const fetchUserData = async () => {
    try {
      // PLACEHOLDER: Replace with your API endpoint
      // const response = await fetch('YOUR_API_URL/user/profile');
      // const data = await response.json();
      // setUserData(data);
      
      // Mock data for now
      setUserData({ name: 'User' });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchPendingActions = async () => {
    try {
      setIsLoading(true);
      // PLACEHOLDER: Replace with your API endpoint
      // const response = await fetch('YOUR_API_URL/user/pending-actions');
      // const data = await response.json();
      // setPendingActions(data);
      
      // Mock data - empty array means no pending actions
      setPendingActions([]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching pending actions:', error);
      setIsLoading(false);
    }
  };

  // BACKEND INTEGRATION: Handle refresh/pull-to-refresh
  const handleRefresh = () => {
    fetchUserData();
    fetchPendingActions();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* PLACEHOLDER: Replace with your UserIcon SVG */}
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Hi {userData.name},</Text>
            <Text style={styles.subGreeting}>Here's your dashboard overview</Text>
          </View>
        </View>
      </View>

      {/* Status Card */}
      <View style={styles.statusCard}>
        {/* PLACEHOLDER: Replace with your Checkmark SVG */}
        <View style={styles.checkmarkContainer}>
          <Text style={styles.checkmarkIcon}>✓</Text>
        </View>
        
        <Text style={styles.statusTitle}>All Caught Up</Text>
        <Text style={styles.statusMessage}>
          No pending actions require your attention at this time.
        </Text>
      </View>

      {/* BACKEND INTEGRATION: Conditional rendering for pending actions */}
      {pendingActions.length > 0 && (
        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>Pending Actions</Text>
          {pendingActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionItem}>
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* BACKEND INTEGRATION: Add more dashboard sections here */}
      {/* Example: Recent activities, assignments, announcements, etc. */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2842C4',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  subGreeting: {
    fontSize: 14,
    color: '#E0E7FF',
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  checkmarkContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F9FF',
    borderWidth: 2,
    borderColor: '#BFDBFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmarkIcon: {
    fontSize: 32,
    color: '#2563EB',
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  statusMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionsContainer: {
    margin: 20,
    marginTop: 0,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 15,
  },
  actionItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 16,
    color: '#1F2937',
  },
});

export default StudentHome;