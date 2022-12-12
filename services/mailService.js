import * as MailComposer from "expo-mail-composer";
import { Text } from "react-native";

export async function composeMail(subject, body, recipients, image) {
  await MailComposer.composeAsync({
    subject: subject,
    body: body,
    recipients: recipients,
    attachments: [image],
  });
}

export function createRecipients(recipients, email) {
  let newRecipients = [...recipients];
  newRecipients.push(email);
  return newRecipients;
}

export async function checkAvailability() {
  const isMailAvailable = await MailComposer.isAvailableAsync();
  return isMailAvailable;
}

export function showRecipients(recipients) {
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
}
