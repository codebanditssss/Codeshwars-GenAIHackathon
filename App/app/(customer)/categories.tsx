import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { ShoppingBag, Shirt, Home, DumbbellIcon, BookOpenText, Gamepad2, Heart, Smartphone } from 'lucide-react-native';

const CATEGORIES = [
  { id: 1, name: 'Groceries', icon: ShoppingBag },
  { id: 3, name: 'Fashion', icon: Shirt },
  { id: 4, name: 'Home & Kitchen', icon: Home },
  { id: 5, name: 'Beauty & Personal Care', icon: Smartphone },
  { id: 6, name: 'Sports & Fitness', icon: DumbbellIcon },
  { id: 7, name: 'Books & Stationery', icon: BookOpenText },
  { id: 8, name: 'Toys & Games', icon: Gamepad2 },
  { id: 9, name: 'Health & Wellness', icon: Heart },
];

export default function CategoriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Browse Categories</Text>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map(category => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <View style={styles.iconContainer}>
                <category.icon size={24} color={colors.primary} />
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.textDark,
  },
  scrollContainer: {
    flex: 1,
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryItem: {
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
  },
}); 