import React, { useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Props } from "../App";

export default function SignInScreen({ navigation }) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { isSwitch, setIsSwitch } = useContext(Props);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (error) {
      console.log(error);
      alert("Not found");
    }
  };
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Text
      //    style={{ fontWeight: "bold", fontSize: "18", marginBottom: 7 }}
      >
        Login
      </Text>
      <View>
        <TextInput
          style={{
            width: 280,
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <TextInput
          style={{
            width: 280,
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
          }}
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={onSignInPress}>
        <Text
          style={{
            width: 280,
            height: 50,
            borderRadius: 10,
            borderWidth: 2,

            padding: 10,
            paddingLeft: 105,
          }}
        >
          Sign in
        </Text>
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          // onPress={() => navigation.navigate("SignUp")}
          onPress={() => setIsSwitch(!isSwitch)}
        >
          <Text style={{ color: "blue" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
