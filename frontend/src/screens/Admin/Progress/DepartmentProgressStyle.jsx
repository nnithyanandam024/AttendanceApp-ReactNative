import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f0ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000',
    marginLeft: 1,
  },
  backButton: {
    padding: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  projectsList: {
    padding: 15,
  },
  projectCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  studentCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
    marginBottom: 8,
  },
  teamSection: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  teamLeadText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  membersText: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
});

export default styles;