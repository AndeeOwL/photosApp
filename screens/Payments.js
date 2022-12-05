import {
  CardField,
  useGooglePay,
  GooglePayButton,
  createGooglePayPaymentMethod,
  ApplePayButton,
  useApplePay,
  confirmApplePayPayment,
  presentApplePay,
} from "@stripe/stripe-react-native";
import { useEffect } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { subscribe } from "../util/database";

function Payments({ route }) {
  const { isGooglePaySupported, initGooglePay } = useGooglePay();
  const { presentApplePay, confirmApplePayPayment, isApplePaySupported } =
    useApplePay();

  useEffect(async () => {
    if (!(await isGooglePaySupported({ testEnv: true }))) {
      Alert.alert("Google Pay is not supported.");
      return;
    }

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
  }, []);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "usd",
      }),
    });
    const { clientSecret } = await response.json();

    return clientSecret;
  };

  const createPaymentMethod = async () => {
    const { error, paymentMethod } = await createGooglePayPaymentMethod({
      amount: 5,
      currencyCode: "USD",
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
    if (!isApplePaySupported) return;

    const { error } = await presentApplePay({
      cartItems: [
        { label: "Subscription", amount: "5", paymentType: "Immediate" },
      ],
      country: "BUL",
      currency: "USD",
      shippingMethods: [
        {
          amount: "5",
          identifier: "USD",
        },
      ],
      requiredBillingContactFields: ["phoneNumber", "name"],
    });

    if (error) {
      Alert.alert("Something went wrong try again !");
    } else {
      const clientSecret = await fetchPaymentIntentClientSecret();

      const { error: confirmError } = await confirmApplePayPayment(
        clientSecret
      );

      if (confirmError) {
        Alert.alert("You must confirm the payment to proceed");
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          Here you can buy your subscription for 5$
        </Text>
      </View>
      {Platform.OS === "android" && (
        <View style={styles.payButton}>
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
        <View style={styles.payButton}>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
  },
  payButton: {
    marginBottom: 50,
  },
});
