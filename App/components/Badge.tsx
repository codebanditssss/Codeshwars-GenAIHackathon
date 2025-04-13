import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Badge as BadgeType } from '@/types';

interface BadgeProps {
  badge: BadgeType;
  size?: 'small' | 'medium' | 'large';
}

export const Badge: React.FC<BadgeProps> = ({ badge, size = 'medium' }) => {
  const iconSize = size === 'small' ? 16 : size === 'medium' ? 24 : 32;
  
  return (
    <View style={[styles.container, styles[`${size}Container`]]}>
      <View style={[styles.iconContainer, styles[`${size}IconContainer`]]}>
        <Award size={iconSize} color={colors.white} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, styles[`${size}Name`]]}>{badge.name}</Text>
        {size !== 'small' && (
          <Text style={styles.description} numberOfLines={2}>
            {badge.description}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  smallContainer: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  mediumContainer: {},
  largeContainer: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 50,
    padding: 8,
    marginRight: 12,
  },
  smallIconContainer: {
    padding: 6,
    marginRight: 8,
  },
  mediumIconContainer: {},
  largeIconContainer: {
    padding: 12,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  smallName: {
    fontSize: 14,
    marginBottom: 0,
  },
  mediumName: {},
  largeName: {
    fontSize: 18,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: colors.text,
  },
});