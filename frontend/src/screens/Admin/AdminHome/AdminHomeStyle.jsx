import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
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
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: '#000',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  deadlinesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  updatesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  deadlinesList: {
    minHeight: 100,
  },
  updatesList: {
    minHeight: 100,
  },
  // New styles for deadline items
  deadlineItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#C884FC',
  },
  deadlineTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 8,
  },
  deadlineDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadlineDate: {
    fontSize: 14,
    color: '#757575',
  },
  deadlinePriority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deadlinePriorityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  // New styles for update items
  updateItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 6,
  },
  updateDescription: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 8,
    lineHeight: 20,
  },
  updateTimestamp: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'right',
  },
  // Loading state styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF5FF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6200EE',
  },
  // Empty state style
  emptyListText: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 14,
    fontStyle: 'italic',
    paddingVertical: 16,
  },
});

export default styles;