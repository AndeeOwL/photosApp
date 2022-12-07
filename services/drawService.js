import { captureRef as takeSnapshotAsync } from "react-native-view-shot";

export async function saveDrawing(ref) {
  const signatureResult = await takeSnapshotAsync(ref, {
    result: "tmpfile",
    quality: 0.5,
    format: "png",
  });
  console.log(signatureResult + " id:" + route.params.id);
  insertPhoto(signatureResult, route.params.id);
}
