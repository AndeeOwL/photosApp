import * as MailComposer from "expo-mail-composer";

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
