import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 24,
  editable = false,
  onRatingChange
}) => {
  const handlePress = (selectedRating: number) => {
    if (editable && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(maxRating)].map((_, index) => {
        const starFilled = index < Math.floor(rating);
        const starHalf = !starFilled && index < Math.ceil(rating) && rating % 1 !== 0;
        
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={editable ? 0.7 : 1}
            disabled={!editable}
            onPress={() => handlePress(index + 1)}
            style={styles.starContainer}
          >
            <Star
              size={size}
              color={starFilled || starHalf ? colors.primary : colors.border}
              fill={starFilled ? colors.primary : 'none'}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    padding: 2,
  },
});