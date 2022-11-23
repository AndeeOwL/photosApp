import { Button, StyleSheet, Text, TextInput, View } from "react-native";

function RegisterForm(props) {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Register</Text>
      <TextInput
        style={styles.inputFields}
        placeholder='Username...'
        onChangeText={props.usernameChange}
      />
      <TextInput
        style={styles.inputFields}
        placeholder='Password...'
        onChangeText={props.passwordChange}
      />
      <TextInput
        style={styles.inputFields}
        placeholder='Repeat Password...'
        onChangeText={props.repeatPasswordChange}
      />
      <Button title='REGISTER' onPress={props.register} />
    </View>
  );
}

export default RegisterForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
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
