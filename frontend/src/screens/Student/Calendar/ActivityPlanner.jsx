import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// PLACEHOLDER: Import your SVG icons here
// import BackIcon from './assets/icons/BackIcon';
import CalendarIcon from '../../../assets/Student/calendar-activity';
import ClockIcon from '../../../assets/Student/time-activity';

const ActivityPlanner = ({ route, navigation }) => {
  // BACKEND INTEGRATION: Get selected date and time from navigation params
  const selectedDateString = route?.params?.selectedDate || new Date().toISOString();
  const selectedTimeString = route?.params?.selectedTime || null;
  const selectedDate = new Date(selectedDateString);

  // Parse selected time if provided (e.g., "2:00 PM")
  const parseTimeString = (timeStr) => {
    if (!timeStr) return null;
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const date = new Date();
    date.setHours(hours, minutes || 0, 0, 0);
    return date;
  };

  const initialStartTime = selectedTimeString ? parseTimeString(selectedTimeString) : new Date(new Date().setHours(1, 0, 0, 0));
  const initialEndTime = new Date(initialStartTime.getTime() + 60 * 60 * 1000); // +1 hour

  const [formData, setFormData] = useState({
    category: '',
    description: '',
    fromDate: selectedDate,
    toDate: selectedDate,
    startTime: initialStartTime,
    endTime: initialEndTime,
  });

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const formatDateForDisplay = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatTimeForDisplay = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const onStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setFormData({ ...formData, startTime: selectedTime });
    }
  };

  const onEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setFormData({ ...formData, endTime: selectedTime });
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.category.trim()) {
      Alert.alert('Validation Error', 'Please select an activity category');
      return;
    }
    if (!formData.description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description');
      return;
    }

    // BACKEND INTEGRATION: Submit activity data to API
    try {
      const activityData = {
        category: formData.category,
        description: formData.description,
        fromDate: formData.fromDate.toISOString(),
        toDate: formData.toDate.toISOString(),
        startTime: formData.startTime.toISOString(),
        endTime: formData.endTime.toISOString(),
        // Additional fields for display
        displayStartTime: formatTimeForDisplay(formData.startTime),
        displayEndTime: formatTimeForDisplay(formData.endTime),
      };

      console.log('Activity Data to Submit:', activityData);
      
      // BACKEND INTEGRATION: API call to create activity
      // const response = await fetch('YOUR_API_ENDPOINT/activities', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${YOUR_AUTH_TOKEN}`,
      //   },
      //   body: JSON.stringify(activityData),
      // });
      // 
      // if (response.ok) {
      //   const createdActivity = await response.json();
      //   Alert.alert('Success', 'Activity created successfully');
      //   
      //   // Pass the created activity back to Calendar
      //   navigation.navigate('MyCalendar', { 
      //     newActivity: createdActivity,
      //     refreshActivities: true 
      //   });
      // } else {
      //   Alert.alert('Error', 'Failed to create activity');
      // }

      // For now, just show success and go back with activity data
      Alert.alert('Success', 'Activity created successfully', [
        {
          text: 'OK',
          onPress: () => {
            // BACKEND INTEGRATION: Pass created activity back to calendar
            navigation.navigate('MyCalendar', { 
              newActivity: activityData,
              refreshActivities: true 
            });
          },
        },
      ]);
    } catch (error) {
      console.error('Error creating activity:', error);
      Alert.alert('Error', 'An error occurred while creating the activity');
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          {/* PLACEHOLDER: Replace with BackIcon SVG component */}
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Activity</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Form Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Activity Category */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Activity Category <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Select Activity Category"
              placeholderTextColor="#999999"
              value={formData.category}
              onChangeText={(text) => setFormData({ ...formData, category: text })}
            />
          </View>

          {/* Description */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Description <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter detailed activity description..."
              placeholderTextColor="#999999"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Date Range Section */}
          <View style={styles.sectionHeader}>
            {/* PLACEHOLDER: Replace with CalendarIcon SVG component */}
            <View style={styles.iconPlaceholder}>
              {/* <Text style={styles.iconText}>📅</Text> */}
                <CalendarIcon width={24} height={24} />
            </View>
            <Text style={styles.sectionTitle}>Date Range</Text>
          </View>

          <View style={styles.rowContainer}>
            {/* From Date */}
            <View style={styles.halfField}>
              <Text style={styles.label}>
                From Date <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.input, styles.readOnlyInput]}>
                <Text style={styles.dateText}>
                  {formatDateForDisplay(formData.fromDate)}
                </Text>
              </View>
            </View>

            {/* To Date */}
            <View style={styles.halfField}>
              <Text style={styles.label}>
                To Date <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.input, styles.readOnlyInput]}>
                <Text style={styles.dateText}>
                  {formatDateForDisplay(formData.toDate)}
                </Text>
              </View>
            </View>
          </View>

          {/* Time Range Section */}
          <View style={styles.sectionHeader}>
            {/* PLACEHOLDER: Replace with ClockIcon SVG component */}
            <View style={styles.iconPlaceholder}>
              {/* <Text style={styles.iconText}>🕐</Text> */}
                <ClockIcon width={24} height={24} />
            </View>
            <Text style={styles.sectionTitle}>Time Range</Text>
          </View>

          <View style={styles.rowContainer}>
            {/* Start Time */}
            <View style={styles.halfField}>
              <Text style={styles.label}>
                Start Time <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity 
                style={styles.input}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Text style={styles.timePickerText}>
                  {formatTimeForDisplay(formData.startTime)}
                </Text>
              </TouchableOpacity>
              {showStartTimePicker && (
                <DateTimePicker
                  value={formData.startTime}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onStartTimeChange}
                />
              )}
            </View>

            {/* End Time */}
            <View style={styles.halfField}>
              <Text style={styles.label}>
                End Time <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity 
                style={styles.input}
                onPress={() => setShowEndTimePicker(true)}
              >
                <Text style={styles.timePickerText}>
                  {formatTimeForDisplay(formData.endTime)}
                </Text>
              </TouchableOpacity>
              {showEndTimePicker && (
                <DateTimePicker
                  value={formData.endTime}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onEndTimeChange}
                />
              )}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Create Activity</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    fontSize: 24,
    color: '#333333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  required: {
    color: '#DC3545',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333333',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  readOnlyInput: {
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#333333',
  },
  timePickerText: {
    fontSize: 14,
    color: '#333333',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  iconText: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  halfField: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#2842C4',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ActivityPlanner;