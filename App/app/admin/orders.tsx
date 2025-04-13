import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Package, Clock, Check, AlertTriangle } from 'lucide-react-native';
import { colors } from '@/constants/colors';

// Mock orders data
const MOCK_ORDERS = [
  {
    id: '1',
    customerName: 'Rahul Verma',
    riderName: 'Ravi Kumar',
    status: 'delivered',
    item: 'Food Package',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    customerName: 'Neha Singh',
    riderName: 'Ankit Singh',
    status: 'in_progress',
    item: 'Grocery Items',
    timestamp: '30 minutes ago',
  },
  {
    id: '3',
    customerName: 'Sanjay Patel',
    riderName: 'Pending',
    status: 'pending',
    item: 'Electronics',
    timestamp: '5 minutes ago',
  },
  {
    id: '4',
    customerName: 'Meena Sharma',
    riderName: 'Priya Sharma',
    status: 'issue',
    item: 'Medicine Package',
    timestamp: '1 hour ago',
  },
];

export default function AdminOrdersScreen() {
  const [filter, setFilter] = useState('all'); // all, pending, in_progress, delivered, issue
  
  const filteredOrders = filter === 'all' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(order => order.status === filter);
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <Check size={18} color={colors.success} />;
      case 'in_progress':
        return <Clock size={18} color={colors.primary} />;
      case 'pending':
        return <Clock size={18} color={colors.gray} />;
      case 'issue':
        return <AlertTriangle size={18} color={colors.error} />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in_progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      case 'issue':
        return 'Issue Reported';
      default:
        return '';
    }
  };
  
  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderIconContainer}>
          <Package size={20} color={colors.white} />
        </View>
        <View>
          <Text style={styles.orderItemText}>{item.item}</Text>
          <Text style={styles.customerText}>Customer: {item.customerName}</Text>
        </View>
        <View style={styles.statusContainer}>
          {getStatusIcon(item.status)}
          <Text style={[
            styles.statusText,
            item.status === 'delivered' && styles.deliveredText,
            item.status === 'in_progress' && styles.inProgressText,
            item.status === 'pending' && styles.pendingText,
            item.status === 'issue' && styles.issueText,
          ]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.orderDetails}>
        <Text style={styles.riderText}>
          Rider: {item.status === 'pending' ? 'Not assigned' : item.riderName}
        </Text>
        <Text style={styles.timestampText}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterText, filter === 'pending' && styles.activeFilterText]}>
            Pending
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'in_progress' && styles.activeFilter]}
          onPress={() => setFilter('in_progress')}
        >
          <Text style={[styles.filterText, filter === 'in_progress' && styles.activeFilterText]}>
            In Progress
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'delivered' && styles.activeFilter]}
          onPress={() => setFilter('delivered')}
        >
          <Text style={[styles.filterText, filter === 'delivered' && styles.activeFilterText]}>
            Delivered
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
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
  filterContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.text,
  },
  activeFilterText: {
    color: colors.white,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 2,
  },
  customerText: {
    fontSize: 14,
    color: colors.text,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  statusText: {
    fontSize: 14,
    marginLeft: 4,
  },
  deliveredText: {
    color: colors.success,
  },
  inProgressText: {
    color: colors.primary,
  },
  pendingText: {
    color: colors.gray,
  },
  issueText: {
    color: colors.error,
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  riderText: {
    fontSize: 14,
    color: colors.text,
  },
  timestampText: {
    fontSize: 14,
    color: colors.gray,
  },
}); 