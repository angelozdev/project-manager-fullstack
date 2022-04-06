import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { HomeScreen, LogInScreen } from "@screens";

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions: StackNavigationOptions = {
  gestureEnabled: true,
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
          <Stack.Screen
            name="Login"
            options={{
              headerShown: false,
            }}
            component={LogInScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
