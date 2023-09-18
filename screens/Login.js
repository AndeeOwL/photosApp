import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AccessToken, LoginButton, Profile } from "react-native-fbsdk-next";
import LoginForm from "../components/LoginForm";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { getUserInfo, loginCheck } from "../services/userService";
import { fetchUser, insertUser } from "../util/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [googleAccessToken, setGoogleAccessToken] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "web-id",
    iosClientId: "ios-id",
    androidClientId: "android-id",
  });
  const navigation = useNavigation();

  WebBrowser.maybeCompleteAuthSession();

  const userInputHandler = (enteredText) => {
    setUsername(enteredText);
  };

  const passwordInputHandler = (enteredText) => {
    setPassword(enteredText);
  };

  const navigateHome = (id, username, subscribed) => {
    navigation.navigate("Home", {
      id: id,
      username: username,
      subscribed: subscribed,
    });
  };

  const checkLoggedUser = async () => {
    const loggedUser = await AsyncStorage.getItem("loggedUser");
    if (loggedUser !== null) {
      const user = await fetchUser(loggedUser);
      if (user) {
        navigateHome(user[0], user[1], user[3]);
      }
    }
  };

  useEffect(() => {
    checkLoggedUser();
  }, []);

  const navigateLogin = async () => {
    const user = await loginCheck(username, password);
    await AsyncStorage.setItem("loggedUser", username);
    navigateHome(user[0], user[1], user[3]);
  };

  useEffect(() => {
    if (response?.type === "success") {
      setGoogleAccessToken(response.authentication.accessToken);
      googleAccessToken && fetchUserInformation();
    }
  }, [response, googleAccessToken]);

  const fetchUserInformation = async () => {
    const userInfo = await getUserInfo(googleAccessToken);
    if (userInfo[0] === true) {
      navigateHome(userInfo[0], userInfo[1], userInfo[3]);
    }
  };

  const navigateRegister = () => {
    navigation.navigate("Register");
  };

  const loginWithFaceBook = () => {
    Profile.getCurrentProfile().then(async function (currentProfile) {
      if (currentProfile) {
        const user = await fetchUser(
          currentProfile.name,
          currentProfile.userID
        );
        if (user.length === 4) {
          await AsyncStorage.setItem("loggedUser", user[1]);
          navigateHome(user[0], user[1], user[3]);
        } else {
          insertUser(currentProfile.name, currentProfile.userID, false);
          const newUser = await fetchUser(
            currentProfile.name,
            currentProfile.userID
          );
          await AsyncStorage.setItem("loggedUser", newUser[1]);
          navigateHome(newUser[0], newUser[1], newUser[3]);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your photos app</Text>
      <LoginForm
        usernameChange={userInputHandler}
        passwordChange={passwordInputHandler}
        login={navigateLogin}
        register={navigateRegister}
      />
      <View style={styles.fbLoginButton}>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data.accessToken.toString());
              });
              loginWithFaceBook();
            }
          }}
          onLogoutFinished={() => console.log("logout.")}
        />
      </View>
      <View style={styles.googleLoginButton}>
        <Button
          title='Login with Google'
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 50,
  },
  googleLoginButton: {
    margin: 10,
    paddingHorizontal: 15,
  },
  fbLoginButton: {
    margin: 10,
  },
});
