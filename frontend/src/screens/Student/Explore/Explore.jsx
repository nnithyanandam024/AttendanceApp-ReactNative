import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import CalendarIcon from '../../../assets/Student/CalendarIcon';
import ClipboardIcon from '../../../assets/Student/ClipboardIcon';
import BusIcon from '../../../assets/Student/BusIcon';

// PLACEHOLDER: Import your navigation screens here
// import MovementPass from './MovementPass';
// import TransportPass from './TransportPass';

const Explore = ({ navigation }) => {
  // BACKEND INTEGRATION: State for activity data
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // BACKEND INTEGRATION: Fetch available activities
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      // PLACEHOLDER: Replace with your API endpoint
      // const response = await fetch('YOUR_API_URL/activities');
      // const data = await response.json();
      // setActivities(data);
      
      // Mock data for now
      setActivities([
        { id: 1, name: 'My Attendance', category: 'Attendence', enabled: true },
        { id: 2, name: 'Movement Pass', category: 'Attendence', enabled: true },
        { id: 3, name: 'Transport Pass', category: 'Transport', enabled: true },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setIsLoading(false);
    }
  };

  // BACKEND INTEGRATION: Handle activity navigation
  const handleActivityPress = (activityName) => {
    // PLACEHOLDER: Replace with your navigation logic
    switch (activityName) {
      case 'My Attendance':
        navigation.navigate('MyAttendance');
        break;
      case 'Movement Pass':
        navigation.navigate('MovementPass');
        console.log('Navigate to Movement Pass');
        break;
      case 'Transport Pass':
        navigation.navigate('TransportPass');
        console.log('Navigate to Transport Pass');
        break;
      default:
        console.log('Unknown activity');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.headerSubtitle}>Choose your Activity</Text>
      </View>

      {/* Attendence Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendence</Text>
        
        <View style={styles.cardRow}>
          {/* My Attendance Card */}
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => handleActivityPress('My Attendance')}
            >
              {/* PLACEHOLDER: Replace with your CalendarIcon SVG */}
              <View style={styles.iconPlaceholder}>
                <CalendarIcon width={28} height={28} />
              </View>
            </TouchableOpacity>
            
            <Text style={styles.cardTitle}>My Attendance</Text>
            
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => handleActivityPress('My Attendance')}
            >
              <Text style={styles.exploreButtonText}>Explore ›</Text>
            </TouchableOpacity>
          </View>

          {/* Movement Pass Card */}
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => handleActivityPress('Movement Pass')}
            >
              {/* PLACEHOLDER: Replace with your ClipboardIcon SVG */}
              <View style={styles.iconPlaceholder}>
                <ClipboardIcon width={28} height={28} />
              </View>
            </TouchableOpacity>
            
            <Text style={styles.cardTitle}>Movement Pass</Text>
            
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => handleActivityPress('Movement Pass')}
            >
              <Text style={styles.exploreButtonText}>Explore ›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Transport Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transport</Text>
        
        <View style={styles.cardRow}>
          {/* Transport Pass Card */}
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => handleActivityPress('Transport Pass')}
            >
              {/* PLACEHOLDER: Replace with your BusIcon SVG */}
              <View style={styles.iconPlaceholder}>
                <BusIcon width={28} height={28} />
              </View>
            </TouchableOpacity>
            
            <Text style={styles.cardTitle}>Transport Pass</Text>
            
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => handleActivityPress('Transport Pass')}
            >
              <Text style={styles.exploreButtonText}>Explore ›</Text>
            </TouchableOpacity>
          </View>

          {/* Empty placeholder for grid alignment */}
          <View style={styles.cardPlaceholder} />
        </View>
      </View>

      {/* BACKEND INTEGRATION: Add more activity sections dynamically */}
      {/* You can map through categories and render cards dynamically */}
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
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#E0E7FF',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 15,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '48%',
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
  cardPlaceholder: {
    width: '48%',
  },
  iconButton: {
    marginBottom: 15,
  },
  iconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F9FF',
    borderWidth: 2,
    borderColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  exploreButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  exploreButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2563EB',
  },
});

export default Explore;