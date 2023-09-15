import { useNavigation } from "@react-navigation/native";
import ExpoDraw from "expo-draw";
import { useRef } from "react";
import { Button, View } from "react-native";
import { saveDrawing } from "../services/drawService";
import ViewShot from "react-native-view-shot";

function Draw({ route }) {
  const navigation = useNavigation();
  const ref = useRef();

  const mySaveFx = async () => {
    //TODO: SaveDrawing not working
    await saveDrawing(ref, route.params.id);
    navigation.navigate("Home", {
      id: route.params.id,
      username: route.params.username,
    });
  };

  return (
    <>
      <ViewShot style={{ flex: 1 }} ref={ref}>
        <ExpoDraw
          strokes={[]}
          containerStyle={{ backgroundColor: "white", height: 300, width: 500 }}
          rewind={(undo) => {
            this._undo = undo;
          }}
          clear={(clear) => {
            this._clear = clear;
          }}
          color={"#000000"}
          strokeWidth={4}
          enabled={true}
          onChangeStrokes={(strokes) => console.log(strokes)}
        />
      </ViewShot>
      <View marginBottom={25}>
        <Button onPress={mySaveFx} title={"Save drawing"} />
      </View>
    </>
  );
}

export default Draw;
