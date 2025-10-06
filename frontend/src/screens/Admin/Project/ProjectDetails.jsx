import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import BackIcon from '../../../assets/Teacher/back.svg'; // You'll need this asset
import { styles, colors } from './ProjectDetailsStyle';

const ProjectDetails = ({ route, navigation }) => {
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    if (route.params?.project) {
      // Make sure the project object has a phases array
      const projectData = route.params.project;
      
      // If project doesn't have phases, add an empty array
      if (!projectData.phases) {
        projectData.phases = [];
      }
      
      setProject(projectData);
    } else {
      setProject({
        id: '1',
        name: 'AI-Based Attendance System',
        department: 'IT',
        status: 'Ongoing',
        date: '27/03/25',
        description: 'A system that uses facial recognition to mark student attendance automatically.',
        phases: [
          {
            number: 1,
            title: 'Collect attendance data manually and define system goals',
            deadline: '2 days',
            completed: true
          },
          {
            number: 2,
            title: 'Develop and test facial recognition model',
            deadline: '5 days',
            completed: true
          },
          {
            number: 3,
            title: 'Integrate model with front-end dashboard',
            deadline: '6 days',
            completed: false
          },
          {
            number: 4,
            title: 'Deploy system on internal server and test',
            deadline: '7 days',
            completed: false
          },
          {
            number: 5,
            title: 'Collect feedback, fix bugs, and submit final report',
            deadline: '9 days',
            completed: false
          }
        ]
      });
    }
  }, [route.params]);

  // Handle back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Get color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return colors.ongoing;
      case 'Completed':
        return colors.completed;
      case 'Pending':
        return colors.pending;
      default:
        return colors.darkGrey;
    }
  };

  if (!project) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading project details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Posted Projects</Text>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Project title and status */}
        <View style={styles.projectHeaderContainer}>
          <Text style={styles.projectTitle}>{project.name}</Text>
          <View style={styles.projectMetaContainer}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Department:</Text>
              <Text style={styles.metaValue}>{project.department}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Status:</Text>
              <View style={[
                styles.statusContainer,
                { backgroundColor: `${getStatusColor(project.status)}15` }
              ]}>
                <View 
                  style={[
                    styles.statusDot, 
                    { backgroundColor: getStatusColor(project.status) }
                  ]} 
                />
                <Text 
                  style={[
                    styles.statusText, 
                    { color: getStatusColor(project.status) }
                  ]}
                >
                  {project.status}
                </Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Date:</Text>
              <Text style={styles.metaValue}>{project.date}</Text>
            </View>
          </View>
        </View>

        {/* Project description */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{project.description || 'No description available'}</Text>
        </View>

        {/* Project phases */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Phase</Text>
          {project.phases && project.phases.length > 0 ? (
            project.phases.map((phase, index) => (
              <View key={index} style={styles.phaseItem}>
                <View style={styles.phaseHeader}>
                  <View style={styles.phaseNumberContainer}>
                    <View 
                      style={[
                        styles.phaseDot,
                        { backgroundColor: phase.completed ? colors.completed : colors.primary }
                      ]} 
                    />
                    <Text style={styles.phaseNumberText}>Phase {phase.number}:</Text>
                  </View>
                </View>
                <Text style={styles.phaseDescription}>{phase.title}</Text>
                <View style={styles.deadlineContainer}>
                  <Text style={styles.deadlineLabel}>Deadline:</Text>
                  <Text style={styles.deadlineValue}>{phase.deadline}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noPhaseText}>No phases available for this project</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectDetails;