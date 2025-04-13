import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { colors } from '@/constants/colors';
import { User, Search, Phone, Calendar, MapPin, ShoppingBag, Mail, Filter, ArrowUpDown } from 'lucide-react-native';

// Mock users data
const MOCK_USERS = [
  {
    id: '1',
    name: 'Amit Kumar',
    email: 'amit.kumar@gmail.com',
    phone: '+91 99876 54321',
    address: 'Connaught Place, New Delhi',
    joinDate: '12 Aug 2023',
    totalOrders: 28,
    totalSpent: '₹4,890',
    profileImage: 'https://randomuser.me/api/portraits/men/12.jpg',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sneha Patel',
    email: 'sneha.p@outlook.com',
    phone: '+91 88765 43210',
    address: 'Powai, Mumbai',
    joinDate: '23 Sep 2023',
    totalOrders: 15,
    totalSpent: '₹2,450',
    profileImage: 'https://randomuser.me/api/portraits/women/33.jpg',
    status: 'active',
  },
  {
    id: '3',
    name: 'Rajesh Singh',
    email: 'rajesh.s@yahoo.com',
    phone: '+91 77654 32109',
    address: 'Electronic City, Bangalore',
    joinDate: '05 Jun 2023',
    totalOrders: 42,
    totalSpent: '₹7,120',
    profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    status: 'active',
  },
  {
    id: '4',
    name: 'Neha Sharma',
    email: 'neha.sharma@gmail.com',
    phone: '+91 66543 21098',
    address: 'Salt Lake, Kolkata',
    joinDate: '18 Nov 2023',
    totalOrders: 7,
    totalSpent: '₹1,250',
    profileImage: 'https://randomuser.me/api/portraits/women/22.jpg',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Vikram Reddy',
    email: 'v.reddy@hotmail.com',
    phone: '+91 55432 10987',
    address: 'Jubilee Hills, Hyderabad',
    joinDate: '30 Jul 2023',
    totalOrders: 19,
    totalSpent: '₹3,580',
    profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
    status: 'inactive',
  },
];

export default function AdminUsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  
  const filteredUsers = MOCK_USERS
    .filter(user => {
      // Apply status filter
      if (statusFilter === 'all') return true;
      return user.status === statusFilter;
    })
    .filter(user => {
      // Apply search query
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.includes(query) ||
        user.address.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'recent') {
        // Simple mock sort by date (in reality would parse dates properly)
        return b.id.localeCompare(a.id);
      } else if (sortBy === 'orders') {
        return b.totalOrders - a.totalOrders;
      } else if (sortBy === 'spent') {
        // Remove currency symbol and commas for numeric comparison
        const aSpent = parseFloat(a.totalSpent.replace('₹', '').replace(',', ''));
        const bSpent = parseFloat(b.totalSpent.replace('₹', '').replace(',', ''));
        return bSpent - aSpent;
      }
      return 0;
    });

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.profileSection}>
          {item.profileImage ? (
            <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <User size={22} color={colors.gray} />
            </View>
          )}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: item.status === 'active' ? colors.successLight : colors.errorLight }
        ]}>
          <Text style={[
            styles.statusText, 
            { color: item.status === 'active' ? colors.success : colors.error }
          ]}>
            {item.status === 'active' ? 'Active' : 'Inactive'}
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
        <View style={styles.detailRow}>
          <Calendar size={16} color={colors.text} />
          <Text style={styles.detailText}>Joined: {item.joinDate}</Text>
        </View>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ShoppingBag size={16} color={colors.primary} />
          <Text style={styles.statLabel}>Orders</Text>
          <Text style={styles.statValue}>{item.totalOrders}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Spent</Text>
          <Text style={styles.statValue}>{item.totalSpent}</Text>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.actionButtonText, { color: colors.primary }]}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, 
          { backgroundColor: item.status === 'active' ? colors.errorLight : colors.successLight }
        ]}>
          <Text style={[styles.actionButtonText, 
            { color: item.status === 'active' ? colors.error : colors.success }
          ]}>
            {item.status === 'active' ? 'Disable' : 'Activate'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.warningLight }]}>
          <Text style={[styles.actionButtonText, { color: colors.warning }]}>View Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer Management</Text>
        <Text style={styles.userCount}>{MOCK_USERS.length} total</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={18} color={colors.text} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.text}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => {
            // Toggle filter menu in real implementation
          }}
        >
          <Filter size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filtersRow}>
        <View style={styles.statusFilters}>
          <TouchableOpacity 
            style={[styles.statusFilterButton, statusFilter === 'all' && styles.activeStatusFilter]}
            onPress={() => setStatusFilter('all')}
          >
            <Text style={[styles.statusFilterText, statusFilter === 'all' && styles.activeStatusFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statusFilterButton, statusFilter === 'active' && styles.activeStatusFilter]}
            onPress={() => setStatusFilter('active')}
          >
            <Text style={[styles.statusFilterText, statusFilter === 'active' && styles.activeStatusFilterText]}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statusFilterButton, statusFilter === 'inactive' && styles.activeStatusFilter]}
            onPress={() => setStatusFilter('inactive')}
          >
            <Text style={[styles.statusFilterText, statusFilter === 'inactive' && styles.activeStatusFilterText]}>Inactive</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sortContainer}>
          <TouchableOpacity 
            style={styles.sortButton}
            onPress={() => {
              const nextSort = sortBy === 'recent' ? 'orders' : 
                              sortBy === 'orders' ? 'spent' : 'recent';
              setSortBy(nextSort);
            }}
          >
            <Text style={styles.sortButtonText}>
              Sort by: {sortBy === 'recent' ? 'Recent' : sortBy === 'orders' ? 'Orders' : 'Spending'}
            </Text>
            <ArrowUpDown size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
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
  userCount: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: colors.textDark,
    fontSize: 14,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusFilters: {
    flexDirection: 'row',
  },
  statusFilterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeStatusFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  statusFilterText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  activeStatusFilterText: {
    color: colors.white,
  },
  sortContainer: {
    flexDirection: 'row',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortButtonText: {
    fontSize: 12,
    color: colors.primary,
    marginRight: 4,
  },
  listContainer: {
    padding: 16,
  },
  userCard: {
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
  userHeader: {
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
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: colors.text,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
    marginVertical: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
}); 