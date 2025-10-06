import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Logout from '../../../assets/Teacher/log-out.svg';
import styles from './AdminHomeStyle';

const StatBox = ({ title, value, bgColor }) => {
  return (
    <View style={[styles.statBox, { backgroundColor: bgColor }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
};

const DeadlineItem = ({ item }) => {
  return (
    <View style={styles.deadlineItem}>
      <Text style={styles.deadlineTitle}>{item.title}</Text>
      <View style={styles.deadlineDetails}>
        <Text style={styles.deadlineDate}>{item.date}</Text>
      </View>
    </View>
  );
};

const UpdateItem = ({ item }) => {
  return (
    <View style={styles.updateItem}>
      <Text style={styles.updateTitle}>{item.title}</Text>
      <Text style={styles.updateDescription}>{item.description}</Text>
      <Text style={styles.updateTimestamp}>{item.timestamp}</Text>
    </View>
  );
};

const TeacherHome = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    ongoingProjects: 0,
    projectsTaken: 0
  });
  const [deadlines, setDeadlines] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Mock API call - replace with actual API calls
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      // Simulating API calls
      // In a real app, these would be actual fetch or axios calls
      
      // Mock stats data
      const statsData = {
        totalProjects: 12,
        completedProjects: 5,
        ongoingProjects: 7,
        projectsTaken: 15
      };
      
      // Mock deadlines data
      const deadlinesData = [
        { id: '1', title: 'Submit Final Project Evaluation', date: 'May 20, 2025' },
        { id: '2', title: 'Review Student Proposals', date: 'May 25, 2025' },
        { id: '3', title: 'Complete Mid-term Assessment', date: 'June 2, 2025' },
        { id: '4', title: 'Faculty Meeting Notes', date: 'June 5, 2025' },
        { id: '5', title: 'Project Progress Reports', date: 'June 10, 2025' },
      ];
      
      // Mock updates data
      const updatesData = [
        { 
          id: '1', 
          title: 'New Project Guidelines', 
          description: 'Updated project guidelines have been published. Please review before next session.',
          timestamp: 'Today, 10:45 AM' 
        },
        { 
          id: '2', 
          title: 'Student Feedback System', 
          description: 'A new feedback system is now available for all ongoing projects.',
          timestamp: 'Yesterday, 2:30 PM' 
        },
        { 
          id: '3', 
          title: 'Department Meeting', 
          description: 'Upcoming department meeting scheduled for next Monday at 3 PM.',
          timestamp: 'May 14, 2025, 9:15 AM' 
        },
        { 
          id: '4', 
          title: 'Curriculum Update', 
          description: 'The curriculum for next semester has been finalized and is available for review.',
          timestamp: 'May 12, 2025, 4:20 PM' 
        },
      ];
      
      // Update state with mock data
      setStats(statsData);
      setDeadlines(deadlinesData);
      setUpdates(updatesData);
      
      // Set loading to false
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
          <Logout width={24} height={24} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatBox 
              title="Total Projects" 
              value={stats.totalProjects.toString()} 
              bgColor="#FFD6FF" 
            />
            <StatBox 
              title="Completed Projects" 
              value={stats.completedProjects.toString()} 
              bgColor="#E7C6FF" 
            />
          </View>
          
          <View style={styles.statsRow}>
            <StatBox 
              title="Ongoing Projects" 
              value={stats.ongoingProjects.toString()} 
              bgColor="#C8B6FF" 
            />  
            <StatBox 
              title="Projects Taken" 
              value={stats.projectsTaken.toString()} 
              bgColor="#B8C0FF" 
            />
          </View>
        </View>
        
        <View style={styles.deadlinesSection}>
          <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
          <FlatList
            data={deadlines}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DeadlineItem item={item} />}
            style={styles.deadlinesList}
            scrollEnabled={false} // Disable scroll inside FlatList since it's nested in ScrollView
            ListEmptyComponent={
              <Text style={styles.emptyListText}>No upcoming deadlines</Text>
            }
          />
        </View>

        <View style={styles.updatesSection}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          <FlatList
            data={updates}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <UpdateItem item={item} />}
            style={styles.updatesList}
            scrollEnabled={false} // Disable scroll inside FlatList since it's nested in ScrollView
            ListEmptyComponent={
              <Text style={styles.emptyListText}>No recent updates</Text>
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherHome;