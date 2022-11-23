import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import PhotoPreview from "./screens/PhotoPreview";
import { init } from "./util/database";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    init();
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
