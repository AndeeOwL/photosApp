import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { PaymentView } from "../components/PaymentView";
import axios from "axios";
import {
  createGooglePayPaymentMethod,
  useApplePay,
  useGooglePay,
} from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchUserSecret } from "../services/paymentService";
import MakePayment from "../components/MakePayment";
import PaymentResponse from "../components/PaymentResponse";

const PaymentScreen = ({ route }) => {
  const [response, setResponse] = useState();
  const navigation = useNavigation();
  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
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
    await fetchUserSecret();
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
      cartItems: cartInfo,
      country: "BUL",
      currency: "BGN",
    });
    if (error) {
      Alert.alert("Apple pay not setted up !");
    } else {
      const clientSecret = await fetchPaymentIntentClientSecret();
      const { error: confirmError } = await confirmApplePayPayment(
        clientSecret
      );
      if (confirmError) {
        Alert.alert("You must confirm the payment to proceed");
      }
      subscribe(route.params.id, true);
      Alert.alert("Success", `The payment was successfull.`);
      navigation.navigate("Home", {
        id: route.params.id,
        username: route.params.username,
      });
    }
  };

  const cartInfo = {
    id: "prod_MvrCJN5lTUaaGD",
    description: "Subscription",
    amount: 1,
  };

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus("Please wait while confirming your payment!");
    setResponse(paymentResponse);
    let jsonResponse = JSON.parse(paymentResponse);
    try {
      const stripeResponse = await axios.post("http://localhost:8000/payment", {
        email: "andybuhchev@gmail.com",
        product: cartInfo,
        authToken: jsonResponse,
      });
      if (stripeResponse) {
        const { paid } = stripeResponse.data;
        if (paid === true) {
          setPaymentStatus("Payment Success");
        } else {
          setPaymentStatus("Payment failed due to some issue");
        }
      } else {
        setPaymentStatus("Payment failed due to some issue");
      }
    } catch (error) {
      setPaymentStatus(" Payment failed due to some issue");
    }
  };

  if (!makePayment) {
    return (
      <MakePayment
        cartInfo={cartInfo}
        setMakePayment={() => setMakePayment(true)}
        createPaymentMethod={createPaymentMethod}
        pay={pay}
      />
    );
  } else {
    if (response !== undefined) {
      return (
        <PaymentResponse paymentStatus={paymentStatus} response={response} />
      );
    } else {
      return (
        <PaymentView
          onCheckStatus={onCheckStatus}
          product={cartInfo.description}
          amount={cartInfo.amount}
        />
      );
    }
  }
};

export default PaymentScreen;
