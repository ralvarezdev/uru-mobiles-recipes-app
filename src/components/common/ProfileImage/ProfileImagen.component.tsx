import React from 'react';
import { View, Image, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './ProfileImage.style';

interface ProfileImageProps {
  imageUri?: string;
  onImageChange?: (uri: string) => void;
  size?: number;
  editable?: boolean;
}

export default function ProfileImage({ 
  imageUri, 
  onImageChange,
  size = 120,
  editable = true,
}: ProfileImageProps) {
  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photos to change your profile picture.'
      );
      return;
    }

    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: launchCamera,
        },
        {
          text: 'Choose from Gallery',
          onPress: launchGallery,
        },
        { 
          text: 'Cancel', 
          style: 'cancel' 
        },
      ]
    );
  };

  const launchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'], 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageChange?.(result.assets[0].uri);
    }
  };

  const launchGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageChange?.(result.assets[0].uri);
    }
  };

  const imageSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const editButtonSize = size * 0.3;
  const editButtonStyle = {
    width: editButtonSize,
    height: editButtonSize,
    borderRadius: editButtonSize / 2,
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={[styles.image, imageSize]}
          />
        ) : (
          <View style={[styles.placeholder, imageSize]}>
            <Ionicons name="person" size={size * 0.5} color="#999" />
          </View>
        )}
        
        {editable && (
          <Pressable 
            style={[styles.editButton, editButtonStyle]} 
            onPress={pickImage}
          >
            <Ionicons name="camera" size={editButtonSize * 0.55} color="#fff" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
