import { Button, StyleSheet, Text, TextInput, View } from "react-native";

function LoginForm(props) {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Login</Text>
      <TextInput
        style={styles.inputFields}
        placeholder='Username...'
        onChangeText={props.usernameChange}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.inputFields}
        placeholder='Password...'
        onChangeText={props.passwordChange}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <Button title='LOGIN' onPress={props.login} />
        </View>
        <View style={styles.buttons}>
          <Button title='REGISTER' onPress={props.register} />
        </View>
      </View>
    </View>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
  },
  formTitle: {
    fontSize: 26,
    margin: 20,
  },
  inputFields: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    margin: 15,
    padding: 10,
  },
  buttons: {
    margin: 10,
  },
});
