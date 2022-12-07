import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as MailComposer from "expo-mail-composer";
import { composeMail, createRecipients } from "../services/mailService";

function Email({ route }) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState(undefined);
  const [body, setBody] = useState(undefined);

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    checkAvailability();
  }, []);

  const sendMail = async () => {
    await composeMail(subject, body, recipients, route.params.image);
  };

  const addRecipients = () => {
    const newRecipients = createRecipients(recipients, email);
    setRecipients(newRecipients);
    setEmail(undefined);
  };

  const showRecipients = () => {
    if (recipients.length === 0) {
      return <Text style={{ margin: 10, fontSize: 22 }}>No recipients</Text>;
    }
    return recipients.map((recipient, index) => {
      return (
        <Text style={{ fontSize: 22 }} key={index}>
          {recipient}
        </Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputFields}
          value={subject}
          onChangeText={setSubject}
          placeholder='Subject:'
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.bodyInputField}
          value={body}
          onChangeText={setBody}
          placeholder='Body:'
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputFields}
          value={email}
          onChangeText={setEmail}
          placeholder='To:'
        />
      </View>
      <Button title='Add recipient' onPress={addRecipients} />
      {showRecipients()}
      {isAvailable ? (
        <Button title='Send mail' onPress={sendMail} />
      ) : (
        <Text style={{ fontSize: 16, marginTop: 25 }}>Email not available</Text>
      )}
    </View>
  );
}

export default Email;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aqua",
  },
  inputFields: {
    height: 35,
    width: 350,
    fontSize: 22,
    padding: 5,
  },
  bodyInputField: {
    height: 250,
    width: 350,
    fontSize: 22,
    padding: 5,
  },
  inputContainer: {
    backgroundColor: "white",
    marginVertical: 10,
  },
});
