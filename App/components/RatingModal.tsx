import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { RatingStars } from './RatingStars';
import { Button } from './Button';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  title: string;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  visible,
  onClose,
  onSubmit,
  title
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.ratingLabel}>How was your experience?</Text>
            <View style={styles.starsContainer}>
              <RatingStars
                rating={rating}
                editable
                size={36}
                onRatingChange={setRating}
              />
            </View>
            
            <Text style={styles.commentLabel}>Additional comments (optional)</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Tell us more about your experience..."
              placeholderTextColor={colors.text}
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={3}
            />
          </View>
          
          <View style={styles.footer}>
            <Button
              title="Submit Rating"
              onPress={handleSubmit}
              disabled={rating === 0}
              type="primary"
              size="large"
              style={styles.submitButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  starsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  commentLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.textDark,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  footer: {
    alignItems: 'center',
  },
  submitButton: {
    width: '100%',
  },
});