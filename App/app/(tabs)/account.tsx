import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Settings, LogOut, Star, Bell, Shield, HelpCircle, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { Header } from '@/components/Header';
import { RatingStars } from '@/components/RatingStars';
import { useAuthStore } from '@/store/auth-store';
import { formatPhoneNumber } from '@/utils/formatters';

export default function AccountScreen() {
  const router = useRouter();
  const { user, userRole, logout } = useAuthStore();
  
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
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
    <SafeAreaView style={styles.container}>
      <Header 
        title="Account" 
        showNotification
        onNotificationPress={() => router.push('/notifications')}
      />
      
      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' }}
                style={styles.profileImage}
              />
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profilePhone}>{formatPhoneNumber(user?.phone || '')}</Text>
              
              <View style={styles.ratingContainer}>
                <RatingStars rating={user?.rating || 0} size={16} />
                <Text style={styles.ratingText}>
                  {user?.rating.toFixed(1)} ({user?.totalRatings})
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => router.push('/profile')}
            activeOpacity={0.7}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <Bell size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.lightGray, true: colors.secondary }}
                thumbColor={colors.white}
              />
            </View>
            
            <View style={styles.settingDivider} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIconContainer, { backgroundColor: colors.accent + '20' }]}>
                  <Settings size={20} color={colors.accent} />
                </View>
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.lightGray, true: colors.secondary }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>More</Text>
          
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuLeft}>
                <View style={[styles.menuIconContainer, { backgroundColor: colors.secondary + '20' }]}>
                  <Star size={20} color={colors.secondary} />
                </View>
                <Text style={styles.menuText}>Rate the App</Text>
              </View>
              
              <ChevronRight size={20} color={colors.text} />
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuLeft}>
                <View style={[styles.menuIconContainer, { backgroundColor: colors.accent + '20' }]}>
                  <HelpCircle size={20} color={colors.accent} />
                </View>
                <Text style={styles.menuText}>Help & Support</Text>
              </View>
              
              <ChevronRight size={20} color={colors.text} />
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuLeft}>
                <View style={[styles.menuIconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <Shield size={20} color={colors.primary} />
                </View>
                <Text style={styles.menuText}>Privacy Policy</Text>
              </View>
              
              <ChevronRight size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogOut size={20} color={colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.neutral,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  editProfileButton: {
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  settingsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 16,
  },
  settingsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
    color: colors.textDark,
  },
  settingDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: colors.textDark,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
});