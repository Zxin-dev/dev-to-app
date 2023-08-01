import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Pressable } from "react-native";
import { Chip, PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
import Blog from "./Blog";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useClerk } from "@clerk/clerk-react";

export default function Main() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigator></StackNavigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
// const Drawer = createDrawerNavigator();
// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen
//         options={{ headerShown: false }}
//         name="Home"
//         component={StackNavigator}
//       ></Drawer.Screen>
//       <Drawer.Screen name="Profile" component={Profile} />
//     </Drawer.Navigator>
//   );
// }
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="Tab"
        component={TabNavigator}
      /> */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Blog" component={Blog} />
    </Stack.Navigator>
  );
}

function Profile() {
  const { signOut } = useClerk();
  return (
    <View
      style={{
        backgroundColor: "white",
        height: 640,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Pressable onPress={() => signOut()}>
        <View
          style={{
            width: 200,
            borderWidth: 1,
            height: 50,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: "#2a9dfa",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign out</Text>
        </View>
      </Pressable>
    </View>
  );
}
