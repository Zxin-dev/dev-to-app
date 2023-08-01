import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useContext } from "react";
import { Props } from "../App";
export default function SignUpScreen({ navigation }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const { isSwitch, setIsSwitch } = useContext(Props);
  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      alert("Verification successful");
      setIsSwitch(!isSwitch);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      alert("error");
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
      {!pendingVerification && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: "18", marginBottom: 7 }}>
            Register
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
              onChangeText={(email) => setEmailAddress(email)}
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
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={onSignUpPress}>
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
              Sign up
            </Text>
          </TouchableOpacity>
          <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
              //  onPress={() => navigation.navigate("SignIn")}
              onPress={() => setIsSwitch(!isSwitch)}
            >
              <Text style={{ color: "blue" }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              style={{
                width: 200,
                height: 50,
                borderWidth: 1.5,
                borderRadius: 10,
                padding: 10,
                marginVertical: 10,
              }}
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text
              style={{
                width: 200,
                height: 50,
                borderWidth: 1,
                borderRadius: 10,
                padding: 12,
                borderColor: "blue",
                paddingLeft: 50,
              }}
            >
              Verify Email
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
