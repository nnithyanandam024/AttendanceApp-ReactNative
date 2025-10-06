import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import CalendarIcon from '../../../assets/Student/CalendarWhite';

const MyCalendar = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 5)); // Oct 5, 2025
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activities, setActivities] = useState([]);

  // BACKEND INTEGRATION: Fetch activities when component mounts or date changes
  useEffect(() => {
    fetchActivitiesForDate(selectedDate);
  }, [selectedDate]);

  // BACKEND INTEGRATION: Handle new activity creation from ActivityPlanner
  useEffect(() => {
    if (route?.params?.newActivity && route?.params?.refreshActivities) {
      // Add new activity to the list
      setActivities(prevActivities => [...prevActivities, route.params.newActivity]);
      
      // Clear the params to avoid re-adding on subsequent renders
      navigation.setParams({ newActivity: null, refreshActivities: false });
      
      // BACKEND INTEGRATION: Optionally refresh all activities from server
      // fetchActivitiesForDate(selectedDate);
    }
  }, [route?.params?.newActivity, route?.params?.refreshActivities]);

  // BACKEND INTEGRATION: Fetch activities for a specific date
  const fetchActivitiesForDate = async (date) => {
    try {
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // BACKEND INTEGRATION: API call to fetch activities
      // const response = await fetch(`YOUR_API_ENDPOINT/activities?date=${dateString}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${YOUR_AUTH_TOKEN}`,
      //   },
      // });
      // 
      // if (response.ok) {
      //   const data = await response.json();
      //   setActivities(data.activities);
      // } else {
      //   console.error('Failed to fetch activities');
      // }

      console.log('Fetching activities for date:', dateString);
      
      // For now, using mock data - replace with API call
      // setActivities([...existing activities from API...]);
      
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const onDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (date) {
      setSelectedDate(date);
      
      // BACKEND INTEGRATION: Navigate to ActivityPlanner with selected date
      if (event.type === 'set') {
        navigation.navigate('ActivityPlanner', { 
          selectedDate: date.toISOString() 
        });
      }
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  // Helper function to get activities for a specific time slot
  const getActivitiesForTimeSlot = (timeSlot) => {
    // Parse the time slot (e.g., "2:00 PM")
    const [time, period] = timeSlot.split(' ');
    let [hours] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    // BACKEND INTEGRATION: Filter activities that fall within this time slot
    return activities.filter(activity => {
      const activityStart = new Date(activity.startTime);
      const activityHour = activityStart.getHours();
      
      // Check if activity starts in this hour
      return activityHour === hours;
    });
  };

  const timeSlots = [
    '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM',
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
  ];

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Calendar</Text>
        <TouchableOpacity 
          onPress={openDatePicker} 
          style={styles.calendarIconBtn}
        >
          {/* PLACEHOLDER: Replace with your CalendarIcon SVG component */}
          <View style={styles.calendarIconPlaceholder}>
            <CalendarIcon width={20} height={20} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Date Display */}
      <TouchableOpacity 
        style={styles.dateSection}
        onPress={openDatePicker}
      >
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          textColor="#333333"
          accentColor="#00897B"
          themeVariant="light"
        />
      )}

      {/* iOS Date Picker Modal */}
      {Platform.OS === 'ios' && showDatePicker && (
        <View style={styles.iosPickerContainer}>
          <View style={styles.iosPickerHeader}>
            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
              <Text style={styles.iosPickerButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setShowDatePicker(false);
              // BACKEND INTEGRATION: Navigate to ActivityPlanner with selected date
              navigation.navigate('ActivityPlanner', { 
                selectedDate: selectedDate.toISOString() 
              });
            }}>
              <Text style={[styles.iosPickerButton, styles.iosPickerDone]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Time Slots */}
      <ScrollView style={styles.timeSlotContainer}>
        {timeSlots.map((time, index) => {
          const slotActivities = getActivitiesForTimeSlot(time);
          
          return (
            <TouchableOpacity 
              key={index} 
              style={styles.timeSlot}
              onPress={() => {
                // BACKEND INTEGRATION: Open activity planner for this time slot
                navigation.navigate('ActivityPlanner', { 
                  selectedDate: selectedDate.toISOString(),
                  selectedTime: time 
                });
              }}
            >
              <Text style={styles.timeText}>{time}</Text>
              <View style={styles.slotContent}>
                {/* BACKEND INTEGRATION: Display activities for this time slot */}
                {slotActivities.length > 0 ? (
                  slotActivities.map((activity, idx) => (
                    <View key={idx} style={styles.activityCard}>
                      <Text style={styles.activityTitle}>{activity.category}</Text>
                      <Text style={styles.activityDescription} numberOfLines={2}>
                        {activity.description}
                      </Text>
                      <Text style={styles.activityTime}>
                        {activity.displayStartTime} - {activity.displayEndTime}
                      </Text>
                    </View>
                  ))
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => {
          // BACKEND INTEGRATION: Navigate to ActivityPlanner
          navigation.navigate('ActivityPlanner', { 
            selectedDate: selectedDate.toISOString() 
          });
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2842C4',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  calendarIconBtn: {
    padding: 8,
  },
  calendarIconPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarIconText: {
    fontSize: 18,
  },
  dateSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  iosPickerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iosPickerButton: {
    fontSize: 16,
    color: '#00897B',
  },
  iosPickerDone: {
    fontWeight: '600',
  },
  timeSlotContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  timeSlot: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    minHeight: 60,
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  slotContent: {
    marginTop: 8,
    minHeight: 20,
  },
  activityCard: {
    backgroundColor: '#F0F4FF',
    padding: 12,
    borderRadius: 6,
    marginTop: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#2842C4',
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#666666',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2842C4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});

export default MyCalendar;