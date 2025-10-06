import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// PLACEHOLDER: Import your SVG icons here
// import BackIcon from '../../../assets/Student/BackIcon';
// import PassIcon from '../../../assets/Student/PassIcon';
import ClockIcon from '../../../assets/Student/time-activity';
import DocumentIcon from '../../../assets/Student/document-activity';

const MovementPass = ({ navigation }) => {
  // BACKEND INTEGRATION: State for movement passes
  const [movementPasses, setMovementPasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Form state
  const [timing, setTiming] = useState(new Date());
  const [purpose, setPurpose] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  // BACKEND INTEGRATION: Fetch movement passes
  useEffect(() => {
    fetchMovementPasses();
  }, []);

  const fetchMovementPasses = async () => {
    try {
      setIsLoading(true);
      // PLACEHOLDER: Replace with your API endpoint
      // const response = await fetch('YOUR_API_URL/movement-passes');
      // const data = await response.json();
      // setMovementPasses(data);
      
      // Mock data for now
      setMovementPasses([
        {
          id: 1,
          date: '05',
          month: 'OCT',
          time: '02:53 PM to 03:13 PM',
          type: 'Attendance Pass',
          description: 'H',
          duration: '1 day',
          status: 'ACTIVE'
        },
        {
          id: 2,
          date: '26',
          month: 'SEP',
          time: '09:51 AM to 10:11 AM',
          type: 'Attendance Pass',
          description: 'Special lab',
          duration: '1 day',
          status: 'EXPIRED'
        },
        {
          id: 3,
          date: '22',
          month: 'SEP',
          time: '04:25 PM to 04:45 PM',
          type: 'Attendance Pass',
          description: 'Returning from PS Slot Venue - BIT Athletic Field Ground',
          duration: '1 day',
          status: 'EXPIRED'
        },
        {
          id: 4,
          date: '22',
          month: 'SEP',
          time: '02:30 PM to 02:50 PM',
          type: 'Attendance Pass',
          description: 'Returning from PS Slot Venue - Vedhanayagam Auditorium',
          duration: '1 day',
          status: 'EXPIRED'
        },
        {
          id: 5,
          date: '22',
          month: 'SEP',
          time: '03:05 PM to 03:25 PM',
          type: 'Attendance Pass',
          description: 'PS Slot on BIT Athletic Field Ground',
          duration: '1 day',
          status: 'EXPIRED'
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching movement passes:', error);
      setIsLoading(false);
    }
  };

  // Format time for display
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  // Handle time change
  const handleTimeChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    
    if (selectedTime) {
      setTiming(selectedTime);
    }
  };

  // BACKEND INTEGRATION: Submit pass request
  const handleSubmitPass = async () => {
    if (!purpose.trim()) {
      alert('Please enter a purpose for the pass');
      return;
    }

    try {
      // PLACEHOLDER: Replace with your API endpoint
      // const response = await fetch('YOUR_API_URL/movement-passes', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     timing: timing.toISOString(),
      //     purpose: purpose,
      //   }),
      // });
      // const data = await response.json();
      
      // Mock success
      console.log('Pass submitted:', { timing: formatTime(timing), purpose });
      setShowCreateModal(false);
      setPurpose('');
      setTiming(new Date());
      
      // Refresh the list
      fetchMovementPasses();
      
      alert('Movement pass request submitted successfully!');
    } catch (error) {
      console.error('Error submitting pass:', error);
      alert('Failed to submit pass request');
    }
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
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Movement Pass</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Movement Passes List */}
        {movementPasses.map((pass) => (
          <View key={pass.id} style={styles.passCard}>
            <View style={styles.passLeft}>
              <View style={[
                styles.dateBox,
                pass.status === 'ACTIVE' ? styles.dateBoxActive : styles.dateBoxExpired
              ]}>
                <Text style={styles.dateNumber}>{pass.date}</Text>
                <Text style={styles.dateMonth}>{pass.month}</Text>
              </View>
            </View>

            <View style={styles.passContent}>
              <View style={styles.passHeader}>
                <Text style={styles.passTime}>{pass.time}</Text>
                <View style={[
                  styles.statusBadge,
                  pass.status === 'ACTIVE' ? styles.statusActive : styles.statusExpired
                ]}>
                  <View style={[
                    styles.statusDot,
                    pass.status === 'ACTIVE' ? styles.dotActive : styles.dotExpired
                  ]} />
                  <Text style={[
                    styles.statusText,
                    pass.status === 'ACTIVE' ? styles.textActive : styles.textExpired
                  ]}>
                    {pass.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.passType}>{pass.type}</Text>
              <Text style={styles.passDescription}>{pass.description}</Text>

              <View style={styles.passFooter}>
                <Text style={styles.passDuration}>Duration  {pass.duration}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowCreateModal(true)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Create Pass Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setShowCreateModal(false)}
            >
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Movement Pass</Text>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Icon and Title Section */}
            <View style={styles.createHeader}>
              <View style={styles.createIconContainer}>
                {/* PLACEHOLDER: Replace with your PassIcon SVG */}
                <Text style={styles.createIcon}>🎫</Text>
              </View>
              <Text style={styles.createTitle}>Create New Pass</Text>
              <Text style={styles.createSubtitle}>
                Fill in the details to request a movement pass
              </Text>
            </View>

            {/* Timing Input */}
            <View style={styles.formSection}>
              <View style={styles.formLabel}>
                {/* PLACEHOLDER: Replace with your ClockIcon SVG */}
                {/* <Text style={styles.labelIcon}>🕐</Text> */}
                <ClockIcon width={20} height={20} style={styles.labelIcon} />
                <Text style={styles.labelText}>Timing</Text>
              </View>
              <TouchableOpacity 
                style={styles.input}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.inputText}>{formatTime(timing)}</Text>
              </TouchableOpacity>
            </View>

            {/* Purpose Input */}
            <View style={styles.formSection}>
              <View style={styles.formLabel}>
                {/* PLACEHOLDER: Replace with your DocumentIcon SVG */}
                {/* <Text style={styles.labelIcon}>📄</Text> */}
                <DocumentIcon width={20} height={20} style={styles.labelIcon} />
                <Text style={styles.labelText}>Purpose</Text>
              </View>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={6}
                placeholder="Describe your reason for the pass..."
                placeholderTextColor="#9CA3AF"
                value={purpose}
                onChangeText={setPurpose}
              />
            </View>
          </ScrollView>

          {/* Submit Button */}
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitPass}
            >
              <Text style={styles.submitButtonText}>Submit Pass Request</Text>
            </TouchableOpacity>
          </View>

          {/* Time Picker */}
          {Platform.OS === 'ios' && showTimePicker && (
            <View style={styles.timePickerContainer}>
              <View style={styles.timePickerHeader}>
                <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                  <Text style={styles.timePickerButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.timePickerTitle}>Select Time</Text>
                <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                  <Text style={[styles.timePickerButton, styles.timePickerDone]}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={timing}
                mode="time"
                display="spinner"
                onChange={handleTimeChange}
              />
            </View>
          )}

          {Platform.OS === 'android' && showTimePicker && (
            <DateTimePicker
              value={timing}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
      </Modal>
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
    paddingTop: 15,
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 6,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  passCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  passLeft: {
    marginRight: 15,
  },
  dateBox: {
    width: 65,
    height: 65,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateBoxActive: {
    backgroundColor: '#0caf25ff',
  },
  dateBoxExpired: {
    backgroundColor: '#f51111ff',
  },
  dateNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  passContent: {
    flex: 1,
  },
  passHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  passTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  statusActive: {
    backgroundColor: '#D1FAE5',
  },
  statusExpired: {
    backgroundColor: '#FEE2E2',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: '#10B981',
  },
  dotExpired: {
    backgroundColor: '#DC2626',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  textActive: {
    color: '#059669',
  },
  textExpired: {
    color: '#DC2626',
  },
  passType: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  passDescription: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
  },
  passFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passDuration: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  priorityBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0369A1',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2842C4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  modalHeader: {
    backgroundColor: '#2842C4',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  createHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  createIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8EBFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  createIcon: {
    fontSize: 40,
  },
  createTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  createSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  formLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelIcon: {
    fontSize: 20,
    marginRight: 8,
    color: '#2842C4',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#FAFAFA',
  },
  inputText: {
    fontSize: 15,
    color: '#1F2937',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#FAFAFA',
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#1F2937',
  },
  modalFooter: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  submitButton: {
    backgroundColor: '#2842C4',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Time picker styles
  timePickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  timePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  timePickerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  timePickerButton: {
    fontSize: 16,
    color: '#2842C4',
  },
  timePickerDone: {
    fontWeight: '600',
  },
});

export default MovementPass;