import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ArrowLeft, Bell, Menu, LogOut } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  showMenu?: boolean;
  showLogout?: boolean;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showNotification = false,
  showMenu = false,
  showLogout = false,
  onNotificationPress,
  onMenuPress
}) => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleBackPress = () => {
    router.back();
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={colors.textDark} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {showNotification && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <Bell size={24} color={colors.textDark} />
          </TouchableOpacity>
        )}
        
        {showMenu && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onMenuPress}
            activeOpacity={0.7}
          >
            <Menu size={24} color={colors.textDark} />
          </TouchableOpacity>
        )}
        
        {showLogout && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogOut size={24} color={colors.error} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    flexDirection: 'row',
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
  },
  iconButton: {
    padding: 4,
  },
});