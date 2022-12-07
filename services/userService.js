export async function loginCheck(username) {
  const user = await fetchUser(username);
  if (username !== user[1]) {
    Alert.alert("Invalid username");
    return;
  }
  if (password !== user[2]) {
    Alert.alert("Invalid password");
    return;
  }
  return user;
}
