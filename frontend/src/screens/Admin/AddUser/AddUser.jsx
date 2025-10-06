import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Modal,
  FlatList
} from 'react-native';
import DropdownIcon from '../../../assets/Admin/dropdown.svg';
import { styles } from './AddUserStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddUser = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    registerNumber: '',
    role: ''
  });
  
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    registerNumber: '',
    role: ''
  });
  
  // Available roles
  const roles = [
    "Admin",
    "Teacher",
    "Student",
    "Subject Expert",
    "Guide"
  ];

  const handleInputChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleRoleSelect = (role) => {
    handleInputChange('role', role);
    setShowRoleModal(false);
    
    // Clear role error
    if (errors.role) {
      setErrors({
        ...errors,
        role: ''
      });
    }
  };

  const handleCancel = () => {
    // Reset form
    setUserData({
      email: '',
      password: '',
      registerNumber: '',
      role: ''
    });
    setErrors({
      email: '',
      password: '',
      registerNumber: '',
      role: ''
    });
  };

  const handleConfirm = () => {
    // Validate form
    let newErrors = {
      email: '',
      password: '',
      registerNumber: '',
      role: ''
    };
    let isValid = true;
    
    // Validate email
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate password
    if (!userData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (userData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    // Validate register number
    if (!userData.registerNumber.trim()) {
      newErrors.registerNumber = 'Register number is required';
      isValid = false;
    }
    
    // Validate role
    if (!userData.role.trim()) {
      newErrors.role = 'Role selection is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    
    if (isValid) {
      // Handle user submission logic here
      console.log("User created:", userData);
      // You could navigate away or show success message here
      
      // Reset form after successful submission
      handleCancel();
    } else {
      console.log("Form has errors, please correct them");
    }
  };

  const renderRoleItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.roleItem} 
      onPress={() => handleRoleSelect(item)}
    >
      <Text style={styles.roleText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.containermain}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add User</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                value={userData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Enter mail-id"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter Password</Text>
              <TextInput
                style={[styles.input, errors.password ? styles.inputError : null]}
                value={userData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder="Enter Password"
                secureTextEntry
              />
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Register Number</Text>
              <TextInput
                style={[styles.input, errors.registerNumber ? styles.inputError : null]}
                value={userData.registerNumber}
                onChangeText={(text) => handleInputChange('registerNumber', text)}
                placeholder="Enter Reg.no"
              />
              {errors.registerNumber ? <Text style={styles.errorText}>{errors.registerNumber}</Text> : null}
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select Role</Text>
              <TouchableOpacity 
                style={[styles.dropdown, errors.role ? styles.inputError : null]}
                onPress={() => setShowRoleModal(true)}
              >
                <Text style={[
                  styles.input, 
                  {
                    color: userData.role ? '#000' : '#999',
                    padding: 10,
                    height: 40,
                    textAlignVertical: 'center'
                  }
                ]}>
                  {userData.role || "Select Role"}
                </Text>
                <DropdownIcon style={styles.dropdownIcon} />
              </TouchableOpacity>
              {errors.role ? <Text style={styles.errorText}>{errors.role}</Text> : null}
            </View>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Role Selection Modal */}
      <Modal
        visible={showRoleModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRoleModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Role</Text>
            
            <FlatList
              data={roles}
              renderItem={renderRoleItem}
              keyExtractor={(item) => item}
              style={styles.rolesList}
            />
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowRoleModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddUser;