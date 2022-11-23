import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import RegisterForm from "../components/RegisterForm";
import { fetchUser, insertUser } from "../util/database";

function Register({ navigation }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();

  const usernameInputHandler = (enteredText) => {
    setUsername(enteredText);
  };

  const passwordInputHandler = (enteredText) => {
    setPassword(enteredText);
  };

  const repeatPasswordInputHandler = (enteredText) => {
    setRepeatPassword(enteredText);
  };

  const navigateLogin = async () => {
    // const user = await fetchUser(username);
    // if (username === user[0]) {
    //   Alert.alert("Username already exist");
    //   return;
    // }
    if (password !== repeatPassword) {
      Alert.alert("Passwords does not match");
      return;
    }

    await insertUser(username, password);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your photos app</Text>
      <RegisterForm
        usernameChange={usernameInputHandler}
        passwordChange={passwordInputHandler}
        repeatPasswordChange={repeatPasswordInputHandler}
        register={navigateLogin}
      />
    </View>
  );
}

export default Register;

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
