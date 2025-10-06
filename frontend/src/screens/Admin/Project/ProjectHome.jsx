import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import SearchIcon from '../../../assets/Teacher/search.svg';
import FilterIcon from '../../../assets/Teacher/filter.svg';
import RemoveIcon from '../../../assets/Teacher/remove.svg';
import { styles, colors } from './ProjectHomeStyle';

const ProjectHome = ({navigation}) => {
  
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    departments: {
      IT: false,
      CSE: false,
      EEE: false,
      ECE: false,
      MECH: false,
      AGRI: false,
      ADS: false,
      BT: false,
      EIE: false,
      FT: false,
      FD: false,
      AERO: false,
      AIML: false,
      CT: false,
    },
    status: {
      Ongoing: false,
      Pending: false,
      Completed: false,
    },
  });
  const [activeFilters, setActiveFilters] = useState([]);

  // Animation for filter panel
  const slideAnim = useState(new Animated.Value(500))[0];

  // Sample data
  const sampleProjects = [
    {
      id: '1',
      name: 'AI-Based Attendance System',
      department: 'IT',
      status: 'Ongoing',
      date: '23/07/35',
    },
    {
      id: '2',
      name: 'Innovation project 2',
      department: 'CSE',
      status: 'Completed',
      date: '23/07/35',
    },
    {
      id: '3',
      name: 'Smart Agriculture Monitoring',
      department: 'AGRI',
      status: 'Completed',
      date: '23/07/35',
    },
    {
      id: '4',
      name: 'Cloud-Based Learning Platform',
      department: 'IT',
      status: 'Ongoing',
      date: '23/07/35',
    },
    {
      id: '5',
      name: 'Renewable Energy Solutions',
      department: 'EEE',
      status: 'Ongoing',
      date: '23/07/35',
    },
    {
      id: '6',
      name: 'Blockchain for Healthcare',
      department: 'CSE',
      status: 'Pending',
      date: '23/07/35',
    },
    {
      id: '7',
      name: 'Advanced Robotics Control',
      department: 'MECH',
      status: 'Completed',
      date: '23/07/35',
    },
  ];

  // Load sample data
  useEffect(() => {
    setProjects(sampleProjects);
    setFilteredProjects(sampleProjects);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let result = [...projects];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply department filters
    const selectedDepartments = Object.keys(filters.departments).filter(
      key => filters.departments[key]
    );
    
    if (selectedDepartments.length > 0) {
      result = result.filter(project => 
        selectedDepartments.includes(project.department)
      );
    }
    
    // Apply status filters
    const selectedStatuses = Object.keys(filters.status).filter(
      key => filters.status[key]
    );
    
    if (selectedStatuses.length > 0) {
      result = result.filter(project => 
        selectedStatuses.includes(project.status)
      );
    }
    
    setFilteredProjects(result);
    
    // Update active filters for chips display
    const newActiveFilters = [];
    
    selectedDepartments.forEach(dept => {
      newActiveFilters.push({ type: 'department', value: dept });
    });
    
    selectedStatuses.forEach(status => {
      newActiveFilters.push({ type: 'status', value: status });
    });
    
    setActiveFilters(newActiveFilters);
    
  }, [searchQuery, filters, projects]);

  // Toggle filter panel with improved animation
  const toggleFilterPanel = () => {
    if (filterVisible) {
      // Hide filter panel
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setFilterVisible(false));
    } else {
      // Show filter panel
      setFilterVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (category, key) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [key]: !prevFilters[category][key],
      },
    }));
  };

  // Apply filters
  const applyFilters = () => {
    toggleFilterPanel();
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      departments: {
        IT: false,
        CSE: false,
        EEE: false,
        ECE: false,
        MECH: false,
        AGRI: false,
        ADS: false,
        BT: false,
        EIE: false,
        FT: false,
        FD: false,
        AERO: false,
        AIML: false,
        CT: false,
      },
      status: {
        Ongoing: false,
        Pending: false,
        Completed: false,
      },
    });
  };

  // Remove specific filter
  const removeFilter = (type, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [type === 'department' ? 'departments' : 'status']: {
        ...prevFilters[type === 'department' ? 'departments' : 'status'],
        [value]: false,
      },
    }));
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
  
  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ongoing':
        return <OngoingIcon width={12} height={12} style={{ marginRight: 4 }} />;
      case 'Completed':
        return <CompletedIcon width={12} height={12} style={{ marginRight: 4 }} />;
      case 'Pending':
        return <PendingIcon width={12} height={12} style={{ marginRight: 4 }} />;
      default:
        return null;
    }
  };

  // Handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Simulate data fetching
    setTimeout(() => {
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setRefreshing(false);
    }, 1000);
  }, []);

  // Render project item with improved styling
  const renderProject = ({ item }) => (
    <TouchableOpacity 
      style={styles.projectItem}
      onPress={() => navigation.navigate('ProjectDetails', { project: item })}
    >
      <View style={styles.projectHeader}>
        <Text style={styles.projectName} numberOfLines={2}>{item.name}</Text>
        <View style={[
          styles.statusContainer,
          { backgroundColor: `${getStatusColor(item.status)}15` } // Light background based on status
        ]}>
          <View 
            style={[
              styles.statusDot, 
              { backgroundColor: getStatusColor(item.status) }
            ]} 
          />
          <Text 
            style={[
              styles.statusText, 
              { color: getStatusColor(item.status) }
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
      <View style={styles.DepDateContainer}>
      <Text style={styles.projectDepartment}>Department: {item.department}</Text>
      <Text style={styles.projectDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render empty component
  const renderEmptyComponent = () => (
    <View style={styles.emptyProjectsContainer}>
      <Text style={styles.emptyProjectsText}>No projects found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Posted Projects</Text>
      </View>

      {/* Main scrollable content */}
      <View style={styles.contentContainer}>
        {/* Search and filter */}
        <View style={styles.searchContainer}>
          <SearchIcon width={20} height={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.darkGrey}
          />
          <TouchableOpacity 
            style={styles.filterIcon} 
            onPress={toggleFilterPanel}
          >
            <FilterIcon width={22} height={22} />
          </TouchableOpacity>
        </View>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterChipsContainer}
            style={styles.filterChips}
            >
            {activeFilters.map((filter, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.filterChip}
                onPress={() => removeFilter(filter.type, filter.value)}
              >
                <Text style={styles.filterChipText}>{filter.value}</Text>
                <RemoveIcon width={12} height={12} style={styles.removeIcon} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Projects list */}
        <View style={styles.projectsListContainer}>
          <FlatList
            data={filteredProjects}
            renderItem={renderProject}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.projectsContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.primary]}
                tintColor={colors.primary}
              />
            }
          />
        </View>
      </View>

      {/* Filter panel */}
      {filterVisible && (
        <>
          <TouchableOpacity 
            style={styles.overlay} 
            activeOpacity={1}
            onPress={toggleFilterPanel}
          />
          <Animated.View 
            style={[
              styles.filterPanel, 
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filters</Text>
              <TouchableOpacity 
                style={styles.removeFiltersButton}
                onPress={clearFilters}
              >
                <Text style={styles.removeFiltersText}>Remove filters</Text>
              </TouchableOpacity>
            </View>
            
            {/* Make the content scrollable but ensure it doesn't overlap with buttons */}
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{ flex: 1 }}
            >
              <ScrollView 
                style={styles.filterScrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }} // Add padding to ensure content doesn't get hidden behind apply button
              >
                {/* Department filter */}
                <Text style={styles.filterSectionTitle}>Department</Text>
                <View style={styles.checkboxRow}>
                  {Object.keys(filters.departments).slice(0, 7).map((dept) => (
                    <TouchableOpacity
                      key={dept}
                      style={styles.checkboxItem}
                      onPress={() => handleCheckboxChange('departments', dept)}
                    >
                      <View style={[
                        styles.checkbox,
                        filters.departments[dept] && { backgroundColor: colors.primary, borderColor: colors.primary }
                      ]}>
                        {/* {filters.departments[dept] && (
                          <Tickbox width={16} height={16} />
                        )} */}
                      </View>
                      <Text style={styles.checkboxLabel}>{dept}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.checkboxRow}>
                  {Object.keys(filters.departments).slice(7).map((dept) => (
                    <TouchableOpacity
                      key={dept}
                      style={styles.checkboxItem}
                      onPress={() => handleCheckboxChange('departments', dept)}
                    >
                      <View style={[
                        styles.checkbox,
                        filters.departments[dept] && { backgroundColor: colors.primary, borderColor: colors.primary }
                      ]}>
                        {/* {filters.departments[dept] && (
                          <TickIcon width={16} height={16} />
                        )} */}
                      </View>
                      <Text style={styles.checkboxLabel}>{dept}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Status filter */}
                <Text style={styles.filterSectionTitle}>Status</Text>
                <View style={styles.checkboxRow}>
                  {Object.keys(filters.status).map((status) => (
                    <TouchableOpacity
                      key={status}
                      style={styles.checkboxItem}
                      onPress={() => handleCheckboxChange('status', status)}
                    >
                      <View style={[
                        styles.checkbox,
                        filters.status[status] && { backgroundColor: colors.primary, borderColor: colors.primary }
                      ]}>
                        {/* {filters.status[status] && (
                          <TickIcon width={16} height={16} />
                        )} */}
                      </View>
                      <Text style={styles.checkboxLabel}>{status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </KeyboardAvoidingView>

          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ProjectHome;