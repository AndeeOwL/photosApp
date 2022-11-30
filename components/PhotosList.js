import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { fetchPhotos } from "../util/database";
import Photo from "./Photo";

function PhotosList(props) {
  const isFocused = useIsFocused();
  const [loadedImages, setLoadedImages] = useState([""]);

  useEffect(() => {
    async function loadPhotos() {
      const photoList = await fetchPhotos(props.id);
      setLoadedImages(photoList);
    }
    if (isFocused) {
      loadPhotos();
    }
  }, [isFocused]);

  if (loadedImages[0] === undefined) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallbackText}>No photos added yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.listContainer}
      data={loadedImages}
      key={(item) => item}
      renderItem={({ item }) => <Photo photo={item} />}
    />
  );
}

export default PhotosList;

const styles = StyleSheet.create({
  fallBackContainer: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  fallbackText: {
    fontWeight: "bold",
  },
  listContainer: {
    marginVertical: 25,
  },
});
