import { supabase } from '@/lib/supabase';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

export async function uploadAvatar(uri: string): Promise<string | null> {
  try {
    // Ensure we have permission to access the photo library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      throw new Error('Permission to access media library was denied');
    }

    // Get the file extension
    const ext = uri.substring(uri.lastIndexOf('.') + 1);
    const fileName = `${Math.random().toString(36).substring(7)}.${ext}`;

    // Convert image to base64
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    const base64Promise = new Promise((resolve) => {
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data.split(',')[1]);
      };
    });
    reader.readAsDataURL(blob);
    const base64 = await base64Promise;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, decode(base64 as string), {
        contentType: `image/${ext}`,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return null;
  }
}

export async function deleteAvatar(filePath: string): Promise<boolean> {
  try {
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    const { error } = await supabase.storage
      .from('avatars')
      .remove([fileName]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting avatar:', error);
    return false;
  }
}

export async function pickImage(): Promise<string | null> {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error picking image:', error);
    return null;
  }
} 