import { useClerk } from "@clerk/clerk-react";
import { View, Text, Pressable, TextInput } from "react-native";
import { useUser } from "@clerk/clerk-react";
import { Image } from "expo-image";
import { useState } from "react";
export default function Profile() {
  const { signOut } = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();
  console.log(JSON.stringify(user, null, 4));
  if (!isLoaded) {
    return null;
  }
  if (!user) return null;
  const [username, setUsername] = useState();
  const updateUser = async () => {
    await user.update({
      username: username,
    });
  };
  console.log(username);
  return (
    <View
      style={{
        backgroundColor: "white",
        height: 640,
        display: "flex",
        alignItems: "center",
      }}
    >
      <View>
        <Image
          style={{ width: 100, height: 100, borderRadius: 100, borderWidth: 1 }}
          source={user.profileImageUrl}
          contentFit="cover"
          transition={1000}
        ></Image>
        <View>
          <Text>{user.username}</Text>
        </View>
        <View>
          <TextInput
            placeholder="Username "
            onChangeText={(username) => setUsername(username)}
          />
          <Pressable onPress={updateUser}>
            <Text>Update ur username</Text>
          </Pressable>
        </View>
      </View>
      <Pressable onPress={() => updateUser()}>
        <View
          style={{
            width: 200,
            borderWidth: 1,
            height: 50,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: "#0601B4",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign out</Text>
        </View>
      </Pressable>
    </View>
  );
}
