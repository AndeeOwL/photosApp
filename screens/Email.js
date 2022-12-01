import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as MailComposer from "expo-mail-composer";

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
    await MailComposer.composeAsync({
      subject: subject,
      body: body,
      recipients: recipients,
      attachments: [route.params.image],
    });
  };

  const addRecipients = () => {
    let newRecipients = [...recipients];
    newRecipients.push(email);
    setRecipients(newRecipients);
    setEmail(undefined);
  };

  const showRecipients = () => {
    if (recipients.length === 0) {
      return <Text>No recipients</Text>;
    }

    return recipients.map((recipient, index) => {
      return <Text key={index}>{recipient}</Text>;
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={subject}
        onChangeText={setSubject}
        placeholder='Subject'
      />
      <TextInput value={body} onChangeText={setBody} placeholder='Body' />
      <TextInput value={email} onChangeText={setEmail} placeholder='Email' />
      <Button title='Add recipient' onPress={addRecipients} />
      {showRecipients()}
      {isAvailable ? (
        <Button title='Send mail' onPress={sendMail} />
      ) : (
        <Text>Email not available</Text>
      )}
    </View>
  );
}

export default Email;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
});
