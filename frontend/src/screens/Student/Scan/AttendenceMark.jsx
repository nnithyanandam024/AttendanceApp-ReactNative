import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Animated, Dimensions, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

const { width, height } = Dimensions.get('window');

const AttendanceMark = () => {
  const [isCameraActive, setIsCameraActive] = useState(true); // Default camera ON
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [scannedData, setScannedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const otpInputs = useRef([]);
  const scanAnimation = useRef(new Animated.Value(0)).current;

  // Scanner Animation
  useEffect(() => {
    if (isCameraActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isCameraActive]);

  // Auto-focus first OTP input when modal opens
  useEffect(() => {
    if (showOTPModal) {
      setTimeout(() => {
        otpInputs.current[0]?.focus();
      }, 300);
    }
  }, [showOTPModal]);

  const scanLineTranslateY = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  // ============= BACKEND INTEGRATION POINT 1: QR CODE SCANNING =============
  const handleQRCodeScanned = ({ data }) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setScannedData(data);
    
    // TODO: Send scanned QR data to backend for validation and mark attendance
    // Example API call:
    /*
    fetch('YOUR_BACKEND_URL/api/attendance/scan-qr', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_AUTH_TOKEN' 
      },
      body: JSON.stringify({ 
        qrData: data, 
        userId: 'USER_ID',
        timestamp: new Date().toISOString()
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        Alert.alert('Success', 'Attendance marked successfully via QR!');
        setIsCameraActive(true); // Keep camera active for next scan
      } else {
        Alert.alert('Error', result.message || 'Invalid QR Code');
      }
      setIsProcessing(false);
    })
    .catch(error => {
      Alert.alert('Error', 'Failed to mark attendance. Please try again.');
      setIsProcessing(false);
    });
    */
    
    // Simulating successful scan
    setTimeout(() => {
      Alert.alert('Success', 'Attendance marked successfully via QR!');
      setIsProcessing(false);
      // Camera stays active for next scan
    }, 500);
  };

  // ============= BACKEND INTEGRATION POINT 2: OTP VERIFICATION =============
  const handleVerifyOTP = () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }

    // TODO: Send OTP to backend for verification and mark attendance
    // Example API call:
    /*
    fetch('YOUR_BACKEND_URL/api/attendance/verify-otp', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_AUTH_TOKEN'
      },
      body: JSON.stringify({ 
        otp: otpValue, 
        userId: 'USER_ID',
        timestamp: new Date().toISOString()
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        Alert.alert('Success', 'Attendance marked successfully via OTP!');
        handleCloseOTPModal();
      } else {
        Alert.alert('Error', result.message || 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        otpInputs.current[0]?.focus();
      }
    })
    .catch(error => {
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    });
    */

    // Simulating verification
    Alert.alert('Success', 'Attendance marked successfully via OTP!');
    handleCloseOTPModal();
  };

  const handleOTPChange = (value, index) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleCloseOTPModal = () => {
    setShowOTPModal(false);
    setOtp(['', '', '', '', '', '']);
    setIsCameraActive(true); // Return to camera view
  };

  const handleUseOTPPress = () => {
    setIsCameraActive(false);
    setShowOTPModal(true);
  };

  return (
    <View style={styles.container}>
      {/* Camera/QR Scanner View - Default Active */}
      {isCameraActive && (
        <View style={styles.cameraContainer}>
          <RNCamera
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            onBarCodeRead={handleQRCodeScanned}
            captureAudio={false}
          />
          
          {/* Scanner Overlay */}
          <View style={styles.scannerOverlay}>
            {/* Scanner Frame */}
            <View style={styles.scannerFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
              
              {/* Animated Scan Line */}
              <Animated.View 
                style={[
                  styles.scanLine,
                  { transform: [{ translateY: scanLineTranslateY }] }
                ]} 
              />
            </View>

            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>Position QR code within the frame to scan</Text>
            </View>
          </View>

          {/* Use OTP Button */}
          <TouchableOpacity 
            style={styles.useOTPButton}
            onPress={handleUseOTPPress}
          >
            <Text style={styles.useOTPButtonText}>Use OTP</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* OTP Modal */}
      <Modal
        visible={showOTPModal}
        transparent
        animationType="slide"
        onRequestClose={handleCloseOTPModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseOTPModal}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Enter your OTP</Text>

            {/* OTP Input Fields */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => otpInputs.current[index] = ref}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOTPChange(value, index)}
                  onKeyPress={(e) => handleOTPKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  selectTextOnFocus
                  placeholder=""
                />
              ))}
            </View>

            {/* Verify Button */}
            <TouchableOpacity 
              style={[
                styles.verifyButton,
                otp.join('').length !== 6 && styles.verifyButtonDisabled
              ]}
              onPress={handleVerifyOTP}
              disabled={otp.join('').length !== 6}
            >
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  scannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scannerFrame: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#fff',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
  },
  instructionContainer: {
    marginTop: 40,
    paddingHorizontal: 40,
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  useOTPButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  useOTPButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingBottom: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 50,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  verifyButton: {
    backgroundColor: '#2842C4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  verifyButtonDisabled: {
    backgroundColor: '#ccc',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AttendanceMark;