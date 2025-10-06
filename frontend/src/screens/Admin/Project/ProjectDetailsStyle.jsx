import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  primary: '#6c5ce7',
  primaryLight: '#8677ed',
  lightPurple: '#e6e1fb',
  white: '#ffffff',
  black: '#333333',
  grey: '#f0f0f0',
  lightGrey: '#f8f8f8',
  darkGrey: '#a0a0a0',
  ongoing: '#f39c12',
  completed: '#2ecc71',
  pending: '#e74c3c',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: "#FDF5FF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.darkGrey,
  },
  // Header styling
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
  // Content container
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  // Project header section
  projectHeaderContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 12,
  },
  projectMetaContainer: {
    marginTop: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    width: 100,
  },
  metaValue: {
    fontSize: 14,
    color: colors.black,
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Section styling
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
  },
  // Phase styling
  phaseItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  phaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phaseNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phaseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  phaseNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },
  phaseDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
    marginVertical: 8,
    paddingLeft: 18,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
  },
  deadlineLabel: {
    fontSize: 13,
    color: colors.darkGrey,
    marginRight: 4,
  },
  deadlineValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  // Tab bar styling
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grey,
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8, // Account for iOS home indicator
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    color: colors.darkGrey,
  },
});