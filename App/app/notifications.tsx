import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { NotificationCard } from '@/components/NotificationCard';
import { EmptyState } from '@/components/EmptyState';
import { useNotificationStore } from '@/store/notification-store';
import { formatDateTime } from '@/utils/formatters';

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();
  
  const handleNotificationPress = (notification: any) => {
    markAsRead(notification.id);
    
    // Handle different notification types
    if (notification.type === 'order' && notification.data?.orderId) {
      router.push(`/order/${notification.data.orderId}`);
    }
  };
  
  const renderEmptyState = () => (
    <EmptyState
      icon={<Bell size={64} color={colors.text} />}
      title="No Notifications"
      message="You don't have any notifications at the moment."
    />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Notifications" 
        showBack
      />
      
      {notifications.length > 0 && (
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={markAllAsRead}
            activeOpacity={0.7}
          >
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.content}>
        {notifications.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NotificationCard
                id={item.id}
                type={item.type}
                title={item.title}
                message={item.message}
                time={formatDateTime(item.time)}
                read={item.read}
                onPress={() => handleNotificationPress(item)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  markAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  markAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});