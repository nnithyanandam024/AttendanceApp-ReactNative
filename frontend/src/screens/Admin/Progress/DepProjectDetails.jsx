import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from './DepProjectDetailsStyle';
import BackIcon from '../../../assets/Teacher/back.svg'; // You'll need this asset

// Import your progress chart image or use a charting library
import progressIcon from '../../../assets/Teacher/deptIcon.png'; // Replace with your actual asset

const DepProjectDetails = ({ route, navigation }) => {
  const { project } = route.params;
  const [teamProgress, setTeamProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching team progress data
    fetchTeamProgressData();
  }, []);

  const fetchTeamProgressData = () => {
    // Simulated data - replace with actual API call
    setTimeout(() => {
      const mockTeamProgress = [
        { id: '1', name: 'GovindSamy', rollNumber: '2024JIT2367', progress: 45 },
        { id: '2', name: 'MunuSamy', rollNumber: '2024JIT2467', progress: 30 },
        { id: '3', name: 'KuppuSamy', rollNumber: '2024JIT2867', progress: 15 },
        { id: '4', name: 'RamSamy', rollNumber: '2024JIT2967', progress: 10 },
      ];
      
      setTeamProgress(mockTeamProgress);
      setLoading(false);
    }, 800);
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    return status === 'Ongoing' ? '#FFA500' : '#4CAF50';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
            <BackIcon width={24} height={24} />
        </TouchableOpacity>
          <Text style={styles.headerText}>{"Projects in " + project.department}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.titleSection}>
          <Text style={styles.projectTitle}>{project.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Department:</Text>
            <Text style={styles.infoValue}>{project.department}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
              <Text style={styles.statusText}>{project.status}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total:</Text>
            <Text style={styles.infoValue}>{project.students} Students</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Team Lead:</Text>
            <Text style={styles.infoValue}>{project.teamLead}</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{project.description}</Text>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Team Progress</Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading progress data...</Text>
            </View>
          ) : (
            <>
              <View style={styles.chartContainer}>
                <Image 
                  source={progressIcon}
                  style={styles.progressChart}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.progressLegend}>
                {teamProgress.map(member => (
                  <View key={member.id} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: getRandomColor(member.id) }]} />
                    <Text style={styles.legendText}>
                      {member.name} ({member.rollNumber})
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function to generate consistent colors for team members
const getRandomColor = (id) => {
  const colors = ['#4B9CD3', '#E57373', '#FFA726', '#66BB6A', '#9575CD', '#4DD0E1'];
  const index = parseInt(id) % colors.length;
  return colors[index];
};

export default DepProjectDetails;