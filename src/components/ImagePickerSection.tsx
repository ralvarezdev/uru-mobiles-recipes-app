import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ImagePickerSectionProps {
  onPress: () => void;
}

export default function ImagePickerSection({ onPress }: ImagePickerSectionProps) {
  return (
    <Pressable style={styles.imageSection} onPress={onPress}>
      <Ionicons name="camera-outline" size={64} color="#6B8E7F" />
      <Text style={styles.imageText}>Add picture</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageSection: {
    height: 180,
    backgroundColor: '#E5E7DF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B8E7F',
    fontWeight: '500',
  },
});