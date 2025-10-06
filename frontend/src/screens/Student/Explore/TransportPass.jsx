import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
// Import your SVG icon here
// import BusIcon from './path-to-your-svg/BusIcon';
import BackIcon from '../../../assets/Student/back';

const TransportPass = ({ navigation }) => {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransportPasses();
  }, []);

  // BACKEND INTEGRATION: Fetch transport passes from API
  const fetchTransportPasses = async () => {
    try {
      setLoading(true);
      // TODO: Replace with your API endpoint
      // const response = await fetch('YOUR_API_ENDPOINT/transport-passes');
      // const data = await response.json();
      // setPasses(data);
      
      // Simulating API call
      setTimeout(() => {
        setPasses([]); // Empty array for now
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching transport passes:', error);
      setLoading(false);
    }
  };

  // BACKEND INTEGRATION: Render individual pass item
  const renderPassItem = ({ item }) => (
    <TouchableOpacity style={styles.passCard}>
      <View style={styles.passHeader}>
        <Text style={styles.passName}>{item.name}</Text>
        <Text style={styles.passStatus}>{item.status}</Text>
      </View>
      <View style={styles.passDetails}>
        <Text style={styles.passLabel}>Valid Until:</Text>
        <Text style={styles.passValue}>{item.validUntil}</Text>
      </View>
      <View style={styles.passDetails}>
        <Text style={styles.passLabel}>Pass ID:</Text>
        <Text style={styles.passValue}>{item.passId}</Text>
      </View>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      {/* PLACEHOLDER: Replace with your imported SVG */}
      <View style={styles.iconPlaceholder}>
        {/* <BusIcon width={80} height={80} color="#9CA3AF" /> */}
        <Text style={styles.iconText}>🚌</Text>
      </View>
      
      <Text style={styles.emptyTitle}>No Transport Passes</Text>
      <Text style={styles.emptySubtitle}>
        You don't have any transport passes at the moment.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
         <BackIcon width={28} height={28} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transport Pass</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2842C4" />
          </View>
        ) : passes.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={passes}
            renderItem={renderPassItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#2842C4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  backIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: -6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: -13,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconPlaceholder: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 80,
    opacity: 0.4,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  listContainer: {
    padding: 16,
  },
  passCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  passHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  passName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  passStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2842C4',
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  passDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  passLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  passValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
});

export default TransportPass;