import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '@/constants/colors';
import { Search, Bell, MapPin } from 'lucide-react-native';

const FEATURED_CATEGORIES = [
  { id: 1, name: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Bakery', image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=200&auto=format&fit=crop' },
  { id: 4, name: 'Meat & Seafood', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=200&auto=format&fit=crop' },
];

const BEST_SELLING = [
  { id: 1, name: 'Organic Bananas', price: 49, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=300&auto=format&fit=crop' },
  { id: 2, name: 'Fresh Avocado', price: 59, image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=300&auto=format&fit=crop' },
  { id: 3, name: 'Greek Yogurt', price: 99, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=300&auto=format&fit=crop' },
  { id: 4, name: 'Whole Wheat Bread', price: 45, image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=300&auto=format&fit=crop' },
  { id: 5, name: 'Brown Rice', price: 129, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=300&auto=format&fit=crop' },
  { id: 6, name: 'Fresh Tomatoes', price: 25, image: 'https://images.unsplash.com/photo-1546094096-0df4bcabd1c3?q=80&w=300&auto=format&fit=crop' },
  { id: 7, name: 'Honey Jar', price: 199, image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=300&auto=format&fit=crop' },
  { id: 8, name: 'Almonds', price: 299, image: 'https://images.unsplash.com/photo-1573851552153-816785fecf4a?q=80&w=300&auto=format&fit=crop' },
];

const OFFERS = [
  { id: 1, title: '30% OFF', subtitle: 'On all vegetables', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=600&auto=format&fit=crop' },
  { id: 2, title: 'Free Delivery', subtitle: 'On orders over $30', image: 'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?q=80&w=600&auto=format&fit=crop' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={18} color={colors.primary} />
          <Text style={styles.locationText}>Deliver to: Home</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={colors.textDark} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={colors.textLight}
        />
      </View>

      {/* Promotional Banners */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.promotionalBannersContainer}
      >
        {OFFERS.map((offer) => (
          <TouchableOpacity key={offer.id} style={styles.promotionalBanner}>
            <Image source={{ uri: offer.image }} style={styles.promotionalImage} />
            <View style={styles.promotionalContent}>
              <Text style={styles.promotionalTitle}>{offer.title}</Text>
              <Text style={styles.promotionalSubtitle}>{offer.subtitle}</Text>
              <TouchableOpacity style={styles.shopNowButton}>
                <Text style={styles.shopNowText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Categories */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {FEATURED_CATEGORIES.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Best Selling Products */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productsGrid}>
          {BEST_SELLING.slice(0, 8).map((product) => (
            <TouchableOpacity key={product.id} style={styles.productItem}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productPrice}>₹{product.price}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textDark,
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textDark,
  },
  promotionalBannersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  promotionalBanner: {
    width: 300,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
  },
  promotionalImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  promotionalContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  promotionalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  promotionalSubtitle: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 8,
  },
  shopNowButton: {
    backgroundColor: colors.white,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seeAllText: {
    color: colors.primary,
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 80,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  categoryName: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textDark,
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 