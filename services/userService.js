import { Alert } from "react-native";
import { Profile } from "react-native-fbsdk-next";
import { fetchUser, insertUser } from "../util/database";

export async function loginCheck(username, password) {
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

export async function getUserInfo(googleAccessToken) {
  let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  });
  const userInfo = await response.json();
  const user = await fetchUser(userInfo.email, userInfo.id);
  if (user.length === 4) {
    return [true, user[0], user[1], user[3]];
  } else {
    insertUser(userInfo.email, userInfo.id, false);
    const user = await fetchUser(userInfo.email, userInfo.id);
    return [true, user[0], user[1], user[3]];
  }
}

export function facebookLogin() {
  Profile.getCurrentProfile().then(async function (currentProfile) {
    if (currentProfile) {
      const user = await fetchUser(currentProfile.name, currentProfile.userID);
      if (user.length === 4) {
        return [true, user[0], user[1], user[3]];
      } else {
        insertUser(currentProfile.name, currentProfile.userID, false);
        const newUser = await fetchUser(
          currentProfile.name,
          currentProfile.userID
        );
        return [true, newUser[0], newUser[1], newUser[3]];
      }
    }
  });
}
