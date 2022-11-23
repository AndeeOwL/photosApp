import { Button, TextInput } from "react-native";

function RegisterForm(props) {
  return (
    <View>
      <Text>Register</Text>
      <TextInput
        placeholder='Username...'
        onChangeText={props.usernameChange}
      />
      <TextInput
        placeholder='Password...'
        onChangeText={props.passwordChange}
      />
      <TextInput
        placeholder='Repeat Password...'
        onChangeText={props.repeatPasswordChange}
      />
      <Button onPress={props.register}>Register</Button>
    </View>
  );
}

export default RegisterForm;
