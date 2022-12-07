import { StyleSheet, Text, View } from "react-native";

function PaymentResponse(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.responseText}>{props.paymentStatus}</Text>
      <Text style={styles.responseText}>{props.response}</Text>
    </View>
  );
}

export default PaymentResponse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  responseText: {
    fontSize: 25,
    margin: 10,
  },
});
