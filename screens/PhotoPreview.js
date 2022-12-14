import { useNavigation } from "@react-navigation/native";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import { ShareDialog } from "react-native-fbsdk-next";
import { windowHeight, windowWidth } from "../constants/dimensions";

function PhotoPreview({ route }) {
  const navigation = useNavigation();
  const photoUri = "file://" + route.params.image;

  const sharePhotoContent = {
    contentType: "photo",
    photos: [{ imageUrl: photoUri }],
  };

  const facebookShare = () => {
    ShareDialog.show(sharePhotoContent);
  };

  const sendMail = () => {
    navigation.navigate("Email", {
      image: route.params.image,
    });
  };

  return (
    <View style={styles.container}>
      <Button title='SHARE ON FACEBOOK' color='blue' onPress={facebookShare} />
      <Button title='SEND ON EMAIL' color='blue' onPress={sendMail} />
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{ uri: route.params.image }} />
      </ScrollView>
    </View>
  );
}

export default PhotoPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
  },
  image: {
    height: windowHeight,
    width: windowWidth,
  },
});
