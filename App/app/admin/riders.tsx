import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Switch } from 'react-native';
import { colors } from '@/constants/colors';
import { Phone, MapPin, Star, AlertCircle, CheckCircle2, User } from 'lucide-react-native';

// Mock riders data
const MOCK_RIDERS = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    address: 'Vasant Kunj, Delhi',
    rating: 4.8,
    totalDeliveries: 342,
    isActive: true,
    onDuty: true,
    vehicleType: 'Motorcycle',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    name: 'Priya Patel',
    phone: '+91 87654 32109',
    address: 'Sector 62, Noida',
    rating: 4.7,
    totalDeliveries: 289,
    isActive: true,
    onDuty: false,
    vehicleType: 'Scooter',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '3',
    name: 'Vikram Singh',
    phone: '+91 76543 21098',
    address: 'Dwarka, Delhi',
    rating: 4.9,
    totalDeliveries: 412,
    isActive: true,
    onDuty: true,
    vehicleType: 'Motorcycle',
    profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: '4',
    name: 'Ananya Gupta',
    phone: '+91 65432 10987',
    address: 'Indirapuram, Ghaziabad',
    rating: 4.5,
    totalDeliveries: 156,
    isActive: false,
    onDuty: false,
    vehicleType: 'Scooter',
    profileImage: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    id: '5',
    name: 'Mohit Verma',
    phone: '+91 54321 09876',
    address: 'Rohini, Delhi',
    rating: 4.6,
    totalDeliveries: 267,
    isActive: true,
    onDuty: true,
    vehicleType: 'Motorcycle',
    profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
];

export default function AdminRidersScreen() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  
  const filteredRiders = MOCK_RIDERS.filter(rider => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return rider.isActive;
    if (filterStatus === 'inactive') return !rider.isActive;
    return true;
  });

  const renderRiderItem = ({ item }) => (
    <View style={styles.riderCard}>
      <View style={styles.cardHeader}>
        <View style={styles.profileSection}>
          {item.profileImage ? (
            <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <User size={22} color={colors.gray} />
            </View>
          )}
          <View style={styles.riderInfo}>
            <Text style={styles.riderName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color={colors.warning} fill={colors.warning} />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.deliveryText}>({item.totalDeliveries} deliveries)</Text>
            </View>
          </View>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: item.isActive ? colors.successLight : colors.errorLight }
        ]}>
          <Text style={[
            styles.statusText, 
            { color: item.isActive ? colors.success : colors.error }
          ]}>
            {item.isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Phone size={16} color={colors.text} />
          <Text style={styles.detailText}>{item.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={16} color={colors.text} />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
        <View style={styles.vehicleContainer}>
          <Text style={styles.vehicleText}>Vehicle: {item.vehicleType}</Text>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <View style={styles.dutyContainer}>
          <Text style={styles.dutyLabel}>On Duty:</Text>
          <Switch 
            value={item.onDuty} 
            trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
            thumbColor={item.onDuty ? colors.primary : colors.gray}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primaryLight }]}
          >
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, 
              { backgroundColor: item.isActive ? colors.errorLight : colors.successLight }
            ]}
          >
            <Text style={[styles.actionButtonText, 
              { color: item.isActive ? colors.error : colors.success }
            ]}>
              {item.isActive ? 'Disable' : 'Activate'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Delivery Partners</Text>
        <Text style={styles.riderCount}>{MOCK_RIDERS.length} total</Text>
      </View>
      
      <View style={styles.filtersContainer}>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            filterStatus === 'all' && styles.activeFilterButton
          ]}
          onPress={() => setFilterStatus('all')}
        >
          <Text style={[
            styles.filterButtonText, 
            filterStatus === 'all' && styles.activeFilterText
          ]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            filterStatus === 'active' && styles.activeFilterButton
          ]}
          onPress={() => setFilterStatus('active')}
        >
          <CheckCircle2 
            size={16} 
            color={filterStatus === 'active' ? colors.white : colors.primary} 
          />
          <Text style={[
            styles.filterButtonText, 
            filterStatus === 'active' && styles.activeFilterText
          ]}>Active</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            filterStatus === 'inactive' && styles.activeFilterButton
          ]}
          onPress={() => setFilterStatus('inactive')}
        >
          <AlertCircle 
            size={16} 
            color={filterStatus === 'inactive' ? colors.white : colors.primary} 
          />
          <Text style={[
            styles.filterButtonText, 
            filterStatus === 'inactive' && styles.activeFilterText
          ]}>Inactive</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredRiders}
        keyExtractor={(item) => item.id}
        renderItem={renderRiderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  riderCount: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  activeFilterText: {
    color: colors.white,
  },
  listContainer: {
    padding: 16,
  },
  riderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightGray,
  },
  profilePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riderInfo: {
    marginLeft: 12,
  },
  riderName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textDark,
    marginLeft: 4,
  },
  deliveryText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 12,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  vehicleContainer: {
    backgroundColor: colors.lightGray,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  vehicleText: {
    fontSize: 12,
    color: colors.textDark,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dutyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dutyLabel: {
    fontSize: 14,
    color: colors.textDark,
    marginRight: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
}); 