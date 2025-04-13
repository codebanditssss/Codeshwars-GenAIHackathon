import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, Award, Package, IndianRupee } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export type NotificationType = 'order' | 'reward' | 'payment' | 'system';

interface NotificationCardProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  onPress?: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  type,
  title,
  message,
  time,
  read,
  onPress
}) => {
  const getIcon = () => {
    switch (type) {
      case 'order':
        return <Package size={24} color={colors.primary} />;
      case 'reward':
        return <Award size={24} color={colors.secondary} />;
      case 'payment':
        return <IndianRupee size={24} color={colors.accent} />;
      case 'system':
      default:
        return <Bell size={24} color={colors.text} />;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, read && styles.readContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </View>
      
      {!read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  readContainer: {
    backgroundColor: colors.neutral,
    shadowOpacity: 0.05,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: colors.text,
  },
  message: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    position: 'absolute',
    top: 16,
    right: 16,
  },
});