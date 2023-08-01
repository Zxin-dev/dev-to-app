import React, { createContext, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, Pressable } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignUpScreen from "./components/SignUp";
import SignInScreen from "./components/SignIn";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./components/Home";
import Blog from "./components/Blog";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "./components/Profile";
export const Props = createContext();
const CLERK_PUBLISHABLE_KEY =
  "pk_test_bm92ZWwtam9leS01Ny5jbGVyay5hY2NvdW50cy5kZXYk";
const Stack = createStackNavigator();

export default function App() {
  const [isSwitch, setIsSwitch] = useState(true);
  console.log(isSwitch);
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <Props.Provider value={{ setIsSwitch, isSwitch }}>
        <SafeAreaView style={{ flex: 1 }}>
          <SignedIn>
            <PaperProvider>
              <NavigationContainer>
                <StackNavigator></StackNavigator>
              </NavigationContainer>
            </PaperProvider>
          </SignedIn>

          <SignedOut>
            {/* <PaperProvider>
    //         <NavigationContainer>
    //           <Stack.Navigator>
    //             <Stack.Screen name="SignIn" component={SignInScreen} />
    //             <Stack.Screen name="SignUp" component={SignUpScreen} />
    //           </Stack.Navigator>
    //         </NavigationContainer>
    //       </PaperProvider> */}
            {isSwitch ? <SignInScreen /> : <SignUpScreen />}
          </SignedOut>
        </SafeAreaView>
      </Props.Provider>
    </ClerkProvider>
  );
}
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tab"
        component={TabNavigator}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Blog" component={Blog} />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
