import { Button, Image, ScrollView, StyleSheet } from "react-native";
import { ShareDialog } from "react-native-fbsdk-next";
import { windowHeight, windowWidth } from "../constants/dimensions";

function PhotoPreview({ route }) {
  const photoUri = "file://" + route.params.image;

  const sharePhotoContent = {
    contentType: "photo",
    photos: [{ imageUrl: photoUri }],
  };

  const facebookShare = () => {
    ShareDialog.show(sharePhotoContent);
  };

  return (
    <>
      <Button title='SHARE' color='blue' onPress={facebookShare} />
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{ uri: route.params.image }} />
      </ScrollView>
    </>
  );
}

export default PhotoPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: windowHeight,
    width: windowWidth,
  },
});
