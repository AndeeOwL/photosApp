import {
  useGooglePay,
  GooglePayButton,
  createGooglePayPaymentMethod,
  ApplePayButton,
  useApplePay,
} from "@stripe/stripe-react-native";
import { useEffect } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { subscribe } from "../util/database";

function Payments({ route }) {
  const { isGooglePaySupported, initGooglePay } = useGooglePay();
  const { presentApplePay, confirmApplePayPayment, isApplePaySupported } =
    useApplePay();

  useEffect(() => {
    if (Platform.OS === "android") {
      const checkGooglePaySupport = async () => {
        if (!(await isGooglePaySupported({ testEnv: true }))) {
          Alert.alert("Google Pay is not supported.");
          return;
        }
      };

      const initGPay = async () => {
        const { error } = await initGooglePay({
          testEnv: true,
          merchantName: "Buy subscription",
          countryCode: "BUL",
          billingAddressConfig: {
            format: "FULL",
            isPhoneNumberRequired: true,
            isRequired: false,
          },
          existingPaymentMethodRequired: false,
          isEmailRequired: true,
        });
        if (error) {
          Alert.alert(error.code, error.message);
          return;
        }
      };
      checkGooglePaySupport();
      initGPay();
    }
  }, []);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`http://localhost:8000/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "bgn",
      }),
    });
    const { clientSecret } = await response.json();

    return clientSecret;
  };

  const createPaymentMethod = async () => {
    const { error, paymentMethod } = await createGooglePayPaymentMethod({
      amount: 10,
      currencyCode: "BGN",
    });

    if (error) {
      Alert.alert(error.code, error.message);
      return;
    } else if (paymentMethod) {
      subscribe(route.params.id, true);
      Alert.alert(
        "Success",
        `The payment method was created successfully. paymentMethodId: ${paymentMethod.id}`
      );
    }
  };

  const pay = async () => {
    if (!isApplePaySupported) {
      Alert.alert("Apple pay is not supperted");
    }

    const { error } = await presentApplePay({
      cartItems: [
        {
          id: "prod_MvrCJN5lTUaaGD",
          label: "Subscription",
          amount: "10",
          paymentType: "Immediate",
        },
      ],
      country: "BUL",
      currency: "BGN",
    });

    if (error) {
      Alert.alert("Something went wrong try again !");
    } else {
      const clientSecret = await fetchPaymentIntentClientSecret();
      console.log(clientSecret);

      const { error: confirmError } = await confirmApplePayPayment(
        clientSecret
      );

      if (confirmError) {
        Alert.alert("You must confirm the payment to proceed");
      }

      subscribe(route.params.id, true);
      Alert.alert("Success", `The payment method was created successfully.`);
      navigation.navigate("Home", {
        id: route.params.id,
        username: route.params.username,
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          Here you can buy your subscription for 10 BGN
        </Text>
      </View>
      {Platform.OS === "android" && (
        <View>
          <GooglePayButton
            type='standard'
            onPress={createPaymentMethod}
            style={{
              width: "100%",
              height: 50,
            }}
          />
        </View>
      )}
      {Platform.OS === "ios" && (
        <View>
          {isApplePaySupported && (
            <ApplePayButton
              onPress={pay}
              type='plain'
              buttonStyle='black'
              borderRadius={4}
              style={{
                width: "100%",
                height: 50,
              }}
            />
          )}
        </View>
      )}
    </>
  );
}

export default Payments;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
    marginBottom: 25,
  },
  text: {
    fontSize: 32,
  },
});
