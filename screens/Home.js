import { useNavigation } from "@react-navigation/native";
import { useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import PhotosList from "../components/PhotosList";
import { takePhoto, uploadPhoto } from "../services/photoService";
import { fetchPhotos } from "../util/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home({ route }) {
  const navigation = useNavigation();
  const [loadedImages, setLoadedImages] = useState([""]);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const loadPhotos = async () => {
    const photoList = await fetchPhotos(route.params.id);
    setLoadedImages(photoList);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("You need to grant camera permissions to use this app");
      return false;
    }
    return true;
  };

  const takePhotoHandler = async () => {
    await takePhoto(
      loadedImages,
      route.params.subscribed,
      verifyPermissions,
      route.params.id
    );
    loadPhotos();
  };

  const uploadPhotoHandler = async () => {
    await uploadPhoto(loadedImages, route.params.subscribed, route.params.id);
    loadPhotos();
  };

  const logoutButtonHandler = async () => {
    await AsyncStorage.setItem("loggedUser", "");
    navigation.navigate("Login");
  };

  const navigateDraw = () => {
    if (loadedImages.length < 10) {
      navigation.navigate("Draw", {
        id: route.params.id,
        username: route.params.username,
      });
    } else {
      Alert.alert("Free space full,buy subscription to add more photos");
    }
  };

  const navigatePayments = () => {
    navigation.navigate("PaymentScreen", {
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
        <Button title='Logout' onPress={logoutButtonHandler} />
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
    marginTop: 20,
    marginBottom: 25,
  },
});
