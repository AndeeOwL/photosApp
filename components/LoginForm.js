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
        <Button style={styles.buttons} title='LOGIN' onPress={props.login} />
        <Button
          style={styles.buttons}
          title='REGISTER'
          onPress={props.register}
        />
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
  },
  buttons: {
    margin: 10,
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
});
