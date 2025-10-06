import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// PLACEHOLDER: Import your SVG icons here
import BackIcon from '../../../assets/Student/back';
import CalendarIcon from '../../../assets/Student/CalendarIcon';

const MyAttendance = ({ navigation }) => {
  // BACKEND INTEGRATION: State for attendance data
  const [attendanceData, setAttendanceData] = useState({
    percentage: '91.06%',
    present: 51,
    absent: 5,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // All attendance time slots
  const timeSlots = [
    { time: '08:45 am to 09:35 am', session: 'Forenoon' },
    { time: '09:35 am to 10:25 am', session: 'Forenoon' },
    { time: '10:40 am to 11:30 am', session: 'Forenoon' },
    { time: '11:30 am to 12:20 pm', session: 'Forenoon' },
    { time: '01:30 pm to 02:20 pm', session: 'Afternoon' },
    { time: '02:20 pm to 03:10 pm', session: 'Afternoon' },
    { time: '03:25 pm to 04:25 pm', session: 'Afternoon' },
  ];

  // BACKEND INTEGRATION: Fetch attendance data
  useEffect(() => {
    fetchAttendanceData();
  }, [selectedDate]);

  const fetchAttendanceData = async () => {
    try {
      setIsLoading(true);
      // PLACEHOLDER: Replace with your API endpoint
      // const formattedDate = selectedDate.toISOString().split('T')[0];
      // const response = await fetch(`YOUR_API_URL/attendance?date=${formattedDate}`);
      // const data = await response.json();
      // setAttendanceData(data.summary);
      // setAttendanceRecords(data.records);
      
      // Mock data for now - generating records for all time slots
      const mockRecords = timeSlots.map((slot, index) => ({
        id: index + 1,
        time: slot.time,
        session: slot.session,
        status: index === 0 ? 'Present' : 'Absent', // First one present, rest absent for demo
        markedBy: index === 0 ? 'Prakash Raj K' : '-',
      }));
      
      setAttendanceRecords(mockRecords);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  // BACKEND INTEGRATION: Handle date selection
  const handleDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (date) {
      setSelectedDate(date);
      // BACKEND INTEGRATION: Fetch attendance for the selected date
      // fetchAttendanceData();
    }
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          {/* PLACEHOLDER: Replace with your BackIcon SVG */}
          {/* <Text style={styles.backIcon}>‹</Text> */}
          <BackIcon width={28} height={28} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance</Text>
      </View>

   
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardLarge]}>
            <Text style={styles.statValue}>{attendanceData.percentage}</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{attendanceData.present}</Text>
            <Text style={styles.statLabel}>Present</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{attendanceData.absent}</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
        </View>

        {/* Date Selector */}
        <TouchableOpacity 
          style={styles.dateSelector}
          onPress={handleDatePress}
        >
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          <CalendarIcon width={20} height={20} style={styles.calendarIcon} />
        </TouchableOpacity>
   <ScrollView style={styles.content}>
        {/* Attendance Records */}
        <View style={styles.recordsContainer}>
          {attendanceRecords.map((record) => (
            <View key={record.id} style={styles.recordCard}>
              <View style={styles.recordLeft}>
                <View style={styles.recordIndicator} />
                <View style={styles.recordInfo}>
                  <Text style={styles.recordTime}>{record.time}</Text>
                  <Text style={styles.recordSession}>{record.session}</Text>
                  <Text style={styles.markedByLabel}>Marked By:</Text>
                  <Text style={styles.markedByName}>{record.markedBy}</Text>
                </View>
              </View>
              
              <View style={styles.recordRight}>
                <View style={[
                  styles.statusBadge,
                  record.status === 'Present' ? styles.statusPresent : styles.statusAbsent
                ]}>
                  <View style={[
                    styles.statusDot,
                    record.status === 'Present' ? styles.dotPresent : styles.dotAbsent
                  ]} />
                  <Text style={[
                    styles.statusText,
                    record.status === 'Present' ? styles.textPresent : styles.textAbsent
                  ]}>
                    {record.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* BACKEND INTEGRATION: Add pagination or load more functionality */}
        {/* <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity> */}
      </ScrollView>

      {/* Date Picker Modal for iOS */}
      {Platform.OS === 'ios' && showDatePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={closeDatePicker}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={closeDatePicker}>
                  <Text style={styles.modalButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Select Date</Text>
                <TouchableOpacity onPress={closeDatePicker}>
                  <Text style={[styles.modalButton, styles.modalButtonDone]}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={new Date()}
                textColor="#000000"
              />
            </View>
          </View>
        </Modal>
      )}

      {/* Date Picker for Android */}
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
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
    paddingTop: 18,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
    marginBottom: 5,
    marginLeft: -6,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 7,
    marginLeft: -9,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 10,
  },
  statCard: {
    backgroundColor: '#E8EBFA',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  statCardLarge: {
    flex: 1.2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2842C4',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  dateSelector: {
    backgroundColor: '#E8EBFA',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  calendarIcon: {
    fontSize: 20,
  },
  recordsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  recordIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3B82F6',
    marginRight: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  recordSession: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  markedByLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  markedByName: {
    fontSize: 12,
    color: '#4B5563',
  },
  recordRight: {
    marginLeft: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  statusPresent: {
    backgroundColor: '#D1FAE5',
  },
  statusAbsent: {
    backgroundColor: '#FEE2E2',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotPresent: {
    backgroundColor: '#10B981',
  },
  dotAbsent: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  textPresent: {
    color: '#059669',
  },
  textAbsent: {
    color: '#DC2626',
  },
  // Modal styles for iOS date picker
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalButton: {
    fontSize: 16,
    color: '#2842C4',
  },
  modalButtonDone: {
    fontWeight: '600',
  },
});

export default MyAttendance;