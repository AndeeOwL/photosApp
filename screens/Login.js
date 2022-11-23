import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import LoginForm from "../components/LoginForm";
import { fetchUser } from "../util/database";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();

  const userInputHandler = (enteredText) => {
    setUsername(enteredText);
  };

  const passwordInputHandler = (enteredText) => {
    setPassword(enteredText);
  };

  const navigateLogin = async () => {
    const user = await fetchUser(username);
    if (username !== user[1]) {
      Alert.alert("Invalid username");
      return;
    }
    if (password !== user[2]) {
      Alert.alert("Invalid password");
      return;
    }

    navigation.navigate("Home", {
      id: user[0],
      username: user[1],
    });
  };

  const navigateRegister = () => {
    navigation.navigate("Register");
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
});
