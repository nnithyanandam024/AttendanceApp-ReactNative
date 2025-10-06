import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containermain: {
    flex: 1,
    backgroundColor: '#FDF5FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f0ff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f0ff',
    padding: 16,
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#FF4D4F',
  },
  errorText: {
    color: '#FF4D4F',
    fontSize: 12,
    marginTop: 4,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 20,
    top: 18,
    height: 20,
    width: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    backgroundColor: '#f3e8ff',
    borderRadius: 30,
    padding: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#C884FC',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#C884FC',
    borderRadius: 30,
    padding: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#000',
  },
  rolesList: {
    maxHeight: 300,
  },
  roleItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  roleText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#C884FC',
    borderRadius: 30,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});