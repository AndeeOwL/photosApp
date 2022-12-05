import { FlatList, StyleSheet, Text, View } from "react-native";

import Photo from "./Photo";

function PhotosList(props) {
  if (props.images[0] === undefined) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallbackText}>No photos added yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.listContainer}
      data={props.images}
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
