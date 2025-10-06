import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f0ff',
  },
  header: {
   flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#a66de9',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 15,
  },
  departmentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  departmentCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  departmentIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  // Style for the selected department (optional)
  selectedDepartment: {
    borderWidth: 2,
    borderColor: '#4c669f',
  },
});

export default styles;