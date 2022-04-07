import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { HomeScreen, LogInScreen, SignUpScreen } from "@screens";
import { client } from "./src/apollo-client";

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions: StackNavigationOptions = {
  gestureEnabled: true,
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={screenOptions}
          >
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LogInScreen}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Signup"
              component={SignUpScreen}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}

export default App;
