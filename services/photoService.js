import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { insertPhoto } from "../util/database";

export async function takePhoto(
  loadedImages,
  subscribed,
  verifyPermissions,
  id
) {
  if (loadedImages.length < 10 || subscribed) {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    let photo = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    await insertPhoto(photo.assets[0].uri, id);
  } else {
    Alert.alert("Free space full buy subscription to add more photos");
  }
}

export async function uploadPhoto(loadedImages, subscribed, id) {
  if (loadedImages.length < 10 || subscribed) {
    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    await insertPhoto(image.assets[0].uri, id);
  } else {
    Alert.alert("Free space full buy subscription to add more photos");
  }
}
