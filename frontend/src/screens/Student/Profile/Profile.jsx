import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

// TODO: Import your SVG icons here
import ProfileIcon from '../../../assets/Student/profile-xxhd.svg';
import VirtualIdIcon from '../../../assets/Student/virtual-id.svg';
import RewardIcon from '../../../assets/Student/reward.svg';

const Profile = () => {
  // TODO: Replace with actual data from backend
  const [userData, setUserData] = useState({
    name: 'USER',
    profileImage: null, // Add profile image URL from backend
    virtualId: null,
    rewardPoints: null,
  });

  // TODO: Fetch user data from backend
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // TODO: Replace with your API endpoint
      // const response = await fetch('YOUR_API_ENDPOINT/user/profile');
      // const data = await response.json();
      // setUserData(data);
      
      console.log('Fetch user data from backend');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleVirtualIdPress = () => {
    // TODO: Navigate to Virtual ID screen or show details
    console.log('Virtual ID pressed');
  };

  const handleRewardPointsPress = () => {
    // TODO: Navigate to Reward Points screen or show details
    console.log('Reward Points pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2842C4" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            {userData.profileImage ? (
              <Image 
                source={{ uri: userData.profileImage }} 
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <ProfileIcon width={90} height={90} fill="#FFFFFF" />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
        </View>

        {/* Basic Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Details</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleVirtualIdPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
               <VirtualIdIcon width={24} height={24} />
              </View>
              <Text style={styles.menuItemText}>My Virtual ID</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Reward Points Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reward Points</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleRewardPointsPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <RewardIcon width={24} height={24} />
              </View>
              <Text style={styles.menuItemText}>My Reward Points</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    backgroundColor: '#2842C4',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8EAFF',
    borderWidth: 3,
    borderColor: '#2842C4',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2842C4',
  },
  placeholderIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#2842C4',
    borderRadius: 30,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2842C4',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2842C4',
    marginBottom: 12,
    paddingLeft: 4,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  chevron: {
    fontSize: 28,
    color: '#CCCCCC',
    fontWeight: '300',
  },
});

export default Profile;