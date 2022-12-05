import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import PhotosList from "../components/PhotosList";
import { fetchPhotos, insertPhoto } from "../util/database";

function Home({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loadedImages, setLoadedImages] = useState([""]);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    async function loadPhotos() {
      const photoList = await fetchPhotos(route.params.id);
      setLoadedImages(photoList);
    }
    if (isFocused) {
      loadPhotos();
    }
  }, [isFocused]);

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("You need to grant camera permissions to use this app");
      return false;
    }
    return true;
  }

  async function takePhotoHandler() {
    if (loadedImages.length < 10 || route.params.subscribed) {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        return;
      }
      const photo = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      await insertPhoto(photo.assets[0].uri, route.params.id);
    } else {
      Alert.alert("Free space empty buy subscription to add more photos");
    }
  }

  async function uploadPhotoHandler() {
    if (loadedImages.length < 10 || route.params.subscribed) {
      const image = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      await insertPhoto(image.assets[0].uri, route.params.id);
    } else {
      Alert.alert("Free space empty buy subscription to add more photos");
    }
  }

  const navigateDraw = () => {
    if (loadedImages.length < 10) {
      navigation.navigate("Draw", {
        id: route.params.id,
        username: route.params.username,
      });
    } else {
      Alert.alert("Free space empty buy subscription to add more photos");
    }
  };

  const navigatePayments = () => {
    navigation.navigate("Payments", {
      id: route.params.id,
      username: route.params.username,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.username}</Text>
      <Text style={styles.secondTitle}>photosApp</Text>
      <PhotosList images={loadedImages} />
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <Button title='Take Photo' onPress={takePhotoHandler} />
        </View>
        <View style={styles.buttons}>
          <Button title='Upload Photo' onPress={uploadPhotoHandler} />
        </View>
        <View style={styles.buttons}>
          <Button title='Draw Photo' onPress={navigateDraw} />
        </View>
      </View>
      <View style={styles.subButton}>
        <Button title='Subscribe' onPress={navigatePayments} />
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 50,
  },
  secondTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttons: {
    marginHorizontal: 10,
  },
  subButton: {
    marginBottom: 25,
  },
});
