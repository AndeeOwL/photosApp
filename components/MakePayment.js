import { ApplePayButton, GooglePayButton } from "@stripe/stripe-react-native";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function MakePayment(props) {
  return (
    <View style={styles.container}>
      <View style={styles.paymentInfo}>
        <Text style={styles.productInfoText}> Make Payment </Text>
        <Text style={styles.productInfoText}>
          Product Description: {props.cartInfo.description}
        </Text>
        <Text style={styles.productInfoText}>
          Payable Amount: {props.cartInfo.amount}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={props.setMakePayment}
      >
        <Text style={styles.buttonTextStyle}>Proceed To Pay</Text>
      </TouchableOpacity>

      {Platform.OS === "android" && (
        <GooglePayButton
          type='standard'
          onPress={props.createPaymentMethod}
          style={{
            width: "100%",
            height: 50,
            margin: 15,
          }}
        />
      )}
      {Platform.OS === "ios" && (
        <ApplePayButton
          onPress={props.pay}
          type='plain'
          buttonStyle='black'
          borderRadius={10}
          style={styles.devicePayButton}
        />
      )}
    </View>
  );
}

export default MakePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  buttonStyle: {
    height: 60,
    width: 300,
    backgroundColor: "#FF5733",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextStyle: {
    color: "#FFF",
    fontSize: 20,
  },
  devicePayButton: {
    width: 350,
    height: 50,
    margin: 15,
  },
  paymentInfo: {
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 250,
    borderRadius: 40,
    marginVertical: 15,
  },
  productInfoText: {
    fontSize: 22,
    color: "white",
  },
});
