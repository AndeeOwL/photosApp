import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import { insertPhoto } from "../util/database";

export async function saveDrawing(ref, id) {
  const signatureResult = await takeSnapshotAsync(ref, {
    result: "tmpfile",
    quality: 0.5,
    format: "png",
  });
  console.log(signatureResult + " id:" + id);
  insertPhoto(signatureResult, id);
}
