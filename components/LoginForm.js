import { Button, StyleSheet, Text, TextInput, View } from "react-native";

function LoginForm(props) {
  <View style={styles.formContainer}>
    <Text>Login</Text>
    <TextInput placeholder='Username...' onChangeText={props.usernameChange} />
    <TextInput placeholder='Password...' onChangeText={props.passwordChange} />
    <View style={styles.buttonContainer}>
      <Button style={styles.buttons} onPress={props.login}>
        Login
      </Button>
      <Button style={styles.buttons} onPress={props.register}>
        Register
      </Button>
    </View>
  </View>;
}

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "grey",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttons: {
    margin: 10,
  },
});
