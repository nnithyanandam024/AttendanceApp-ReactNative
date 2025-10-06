import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import styles from './ProgressHomeStyle';

// Import your department icon image
import deptIcon from '../../../assets/Teacher/deptIcon.png'; 

const departments = [
  { id: 'cse', name: 'CSE' },
  { id: 'it', name: 'IT' },
  { id: 'eee', name: 'EEE' },
  { id: 'ece', name: 'ECE' },
  { id: 'mech', name: 'MECH' },
  { id: 'agri', name: 'AGRI' },
  { id: 'aids', name: 'AIDS' },
  { id: 'bt', name: 'BT' },
  { id: 'eie', name: 'EIE' },
  { id: 'ft', name: 'FT' },
  { id: 'fd', name: 'FD' },
  { id: 'aero', name: 'AERO' },
  { id: 'aiml', name: 'AIML' },
  { id: 'ct', name: 'CT' },
];

const ProgressHome = ({ navigation }) => {
  const handleDepartmentSelect = (department) => {
    // Navigate to department details screen
    navigation.navigate('DepartmentProgress', { department });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Student Progress</Text>
      </View>
      
      <Text style={styles.subtitle}>Choose Department</Text>
      
      <ScrollView contentContainerStyle={styles.departmentsGrid}>
        {departments.map((dept) => (
          <TouchableOpacity
            key={dept.id}
            style={styles.departmentCard}
            onPress={() => handleDepartmentSelect(dept)}
            activeOpacity={0.7}
          >
            <Image 
              source={deptIcon}
              style={styles.departmentIcon}
            />
            <Text style={styles.departmentName}>{dept.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgressHome;