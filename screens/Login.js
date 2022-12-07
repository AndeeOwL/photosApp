import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { AccessToken, LoginButton, Profile } from "react-native-fbsdk-next";
import LoginForm from "../components/LoginForm";
import { fetchUser, insertUser } from "../util/database";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { loginCheck } from "../services/userService";

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

  const navigateLogin = async () => {
    const user = await loginCheck(username);
    navigation.navigate("Home", {
      id: user[0],
      username: user[1],
      subscribed: user[3],
    });
  };

  useEffect(() => {
    if (response?.type === "success") {
      setGoogleAccessToken(response.authentication.accessToken);
      googleAccessToken && fetchUserInformation();
    }
  }, [response, googleAccessToken]);

  const fetchUserInformation = async () => {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    });
    const userInfo = await response.json();
    const user = await fetchUser(userInfo.email, userInfo.id);
    if (user.length === 4) {
      navigation.navigate("Home", {
        id: user[0],
        username: user[1],
        subscribed: user[3],
      });
    } else {
      insertUser(userInfo.email, userInfo.id, false);
    }
    const insertedUser = await fetchUser(userInfo.email, userInfo.id);
    if (insertedUser.length === 4) {
      navigation.navigate("Home", {
        id: insertedUser[0],
        username: insertedUser[1],
        subscribed: insertedUser[3],
      });
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
          navigation.navigate("Home", {
            id: user[0],
            username: user[1],
            subscribed: user[3],
          });
        } else {
          insertUser(user.name, user.id, false);
        }

        navigation.navigate("Home", {
          id: currentProfile.userID,
          username: currentProfile.name,
          subscribed: user[3],
        });
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
      <View style={styles.googleLoginButton}>
        <Button
          color='white'
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
    backgroundColor: "red",
    margin: 10,
    paddingHorizontal: 15,
  },
});
