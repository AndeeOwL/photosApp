import { Image, Pressable, StyleSheet } from "react-native";

function Photo({ photo, navigation }) {
  const openImagePreview = () => {
    navigation.navigate("PhotoPreview", {
      image: photo,
    });
  };

  return (
    <Pressable style={styles.container} onPress={openImagePreview}>
      <Image style={styles.photo} source={{ uri: photo }} />
    </Pressable>
  );
}

export default Photo;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 150,
    borderRadius: 15,
    margin: 15,
  },
  photo: {
    height: 150,
    width: 300,
  },
});
