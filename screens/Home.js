import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import PhotosList from "../components/PhotosList";
import { insertPhoto } from "../util/database";

function Home() {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

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
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const photo = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    await insertPhoto(photo.assets[0].uri);
  }

  async function uploadPhotoHandler() {
    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    await insertPhoto(image.assets[0].uri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your photos app</Text>
      <PhotosList />
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <Button title='Take Photo' onPress={takePhotoHandler} />
        </View>
        <View style={styles.buttons}>
          <Button title='Upload Photo' onPress={uploadPhotoHandler} />
        </View>
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
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttons: {
    marginHorizontal: 10,
    marginBottom: 50,
  },
});
