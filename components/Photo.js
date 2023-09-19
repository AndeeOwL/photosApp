import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { deletePhoto } from "../util/database";

function Photo({ photo }) {
  const navigation = useNavigation();
  const openImagePreview = () => {
    navigation.navigate("PhotoPreview", {
      image: photo,
    });
  };

  const deleteFromDB = async () => {
    await deletePhoto(photo);
  };

  return (
    <Pressable style={styles.container} onPress={openImagePreview}>
      <Image style={styles.photo} source={{ uri: photo }} />
      <Pressable
        style={styles.deleteButtonContainer}
        onPress={() => deleteFromDB()}
      >
        <Text style={styles.deleteButton}>X</Text>
      </Pressable>
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
    position: "absolute",
    height: 150,
    width: 300,
  },
  deleteButtonContainer: {
    alignItems: "flex-end",
  },
  deleteButton: {
    margin: 5,
    color: "red",
    fontSize: 25,
    backgroundColor: "black",
    padding: 5,
  },
});
