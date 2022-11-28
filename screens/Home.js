import { useNavigation } from "@react-navigation/native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { LoginButton } from "react-native-fbsdk-next";
import PhotosList from "../components/PhotosList";
import { insertPhoto } from "../util/database";

function Home({ route }) {
  const navigation = useNavigation();
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
    await insertPhoto(photo.assets[0].uri, route.params.id);
  }

  async function uploadPhotoHandler() {
    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    await insertPhoto(image.assets[0].uri, route.params.id);
  }

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.username}</Text>
      <Text style={styles.secondTitle}>photosApp</Text>
      <PhotosList id={route.params.id} />
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <Button title='Take Photo' onPress={takePhotoHandler} />
        </View>
        <View style={styles.buttons}>
          <Button title='Upload Photo' onPress={uploadPhotoHandler} />
        </View>
      </View>
      <LoginButton
        marginBottom={50}
        onLoginFinished={(error, result) => {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={navigateLogin}
      />
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
  logoutButton: {
    marginBottom: 50,
  },
});
