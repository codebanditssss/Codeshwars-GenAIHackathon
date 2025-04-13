import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface Location {
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  pickupLocation: Location;
  deliveryLocation: Location;
  height?: number;
  showLabels?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({
  pickupLocation,
  deliveryLocation,
  height = 200,
  showLabels = true
}) => {
  // For web, we'll use a static map image since we can't use native map components
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { height }]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?q=80&w=2831&auto=format&fit=crop' }}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={styles.markerContainer}>
            <View style={styles.pickupMarker}>
              <MapPin size={24} color={colors.primary} fill={colors.primary} />
            </View>
            {showLabels && <Text style={styles.markerLabel}>Pickup</Text>}
          </View>
          
          <View style={styles.routeLine} />
          
          <View style={styles.markerContainer}>
            <View style={styles.deliveryMarker}>
              <MapPin size={24} color={colors.secondary} fill={colors.secondary} />
            </View>
            {showLabels && <Text style={styles.markerLabel}>Delivery</Text>}
          </View>
        </View>
      </View>
    );
  }

  // For mobile, we'd use a real map component, but for this demo we'll use a static image
  return (
    <View style={[styles.container, { height }]}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?q=80&w=2831&auto=format&fit=crop' }}
        style={styles.mapImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.markerContainer}>
          <View style={styles.pickupMarker}>
            <MapPin size={24} color={colors.primary} fill={colors.primary} />
          </View>
          {showLabels && <Text style={styles.markerLabel}>Pickup</Text>}
        </View>
        
        <View style={styles.routeLine} />
        
        <View style={styles.markerContainer}>
          <View style={styles.deliveryMarker}>
            <MapPin size={24} color={colors.secondary} fill={colors.secondary} />
          </View>
          {showLabels && <Text style={styles.markerLabel}>Delivery</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  markerContainer: {
    alignItems: 'center',
  },
  pickupMarker: {
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  deliveryMarker: {
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  routeLine: {
    flex: 1,
    height: 3,
    backgroundColor: colors.secondary,
    marginHorizontal: 10,
  },
});