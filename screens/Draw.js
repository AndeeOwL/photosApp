import { useNavigation } from "@react-navigation/native";
import ExpoDraw from "expo-draw";
import { useRef } from "react";
import { Button, View } from "react-native";
import ViewShot, {
  captureRef as takeSnapshotAsync,
} from "react-native-view-shot";
import { insertPhoto } from "../util/database";

function Draw({ route }) {
  const navigation = useNavigation();
  const ref = useRef();
  const mySaveFx = async () => {
    const signatureResult = await takeSnapshotAsync(ref, {
      result: "tmpfile",
      quality: 0.5,
      format: "png",
    });

    insertPhoto(signatureResult, route.params.id);
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
        <Button
          onPress={() => {
            mySaveFx;
            navigation.navigate("Home", {
              id: route.params.id,
              username: route.params.username,
            });
          }}
          title={"Save drawing"}
        />
      </View>
    </>
  );
}

export default Draw;
