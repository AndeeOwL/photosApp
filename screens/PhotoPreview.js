import { Image, ScrollView, StyleSheet, View } from "react-native";
import { windowHeight, windowWidth } from "../constants/dimensions";

function PhotoPreview({ route }) {
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: route.params.image }} />
    </ScrollView>
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
