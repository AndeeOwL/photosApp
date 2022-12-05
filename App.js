import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import PhotoPreview from "./screens/PhotoPreview";
import { init } from "./util/database";
import { LogBox } from "react-native";
import Draw from "./screens/Draw";
import Email from "./screens/Email";
import { initStripe } from "@stripe/stripe-react-native";
import Payments from "./screens/Payments";

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(["source.uri"]);
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    initStripe({
      publishableKey:
        "pk_test_51GiLv8F540OZ8hRRLPioJ3NouApToX5xYVC1YrDPmiShigYYZm8VXBYpv7ERfBPYKzab58CgLOjzopoWCiB432aJ00edTXox9H",
      merchantIdentifier: "merchant.com.photosApp",
      urlScheme: "your-url-scheme",
    });
  }, []);

  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Register'
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='PhotoPreview'
            component={PhotoPreview}
            options={{
              title: "",
              headerShown: true,
              headerStyle: {
                backgroundColor: "aqua",
              },
            }}
          />
          <Stack.Screen
            name='Draw'
            component={Draw}
            options={{
              title: "",
              headerShown: true,
              headerStyle: {
                backgroundColor: "aqua",
              },
            }}
          />
          <Stack.Screen
            name='Email'
            component={Email}
            options={{
              title: "",
              headerShown: true,
              headerStyle: {
                backgroundColor: "aqua",
              },
            }}
          />
          <Stack.Screen
            name='Payments'
            component={Payments}
            options={{
              title: "",
              headerShown: true,
              headerStyle: {
                backgroundColor: "aqua",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
