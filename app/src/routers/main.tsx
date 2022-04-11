import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  ProjectsScreen,
  LogInScreen,
  SignUpScreen,
  SplashScreen,
  ProjectDetailScreen,
} from "@screens";
import { useAuthContext } from "@contexts/auth";
import { useLazyQuery } from "@apollo/client";
import { queries } from "@apollo-client";
import { toasts } from "@utils";

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions: StackNavigationOptions = {
  gestureEnabled: true,
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerTitleAlign: "center",
};

export default function Main() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
        {user ? (
          <>
            <Stack.Screen
              options={{ title: "Proyectos" }}
              name="Projects"
              component={ProjectsScreen}
            />

            <Stack.Screen
              options={({ route }) => ({
                title: route.params.name,
              })}
              name="ProjectDetail"
              component={ProjectDetailScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
              }}
              component={LogInScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
              }}
              name="Signup"
              component={SignUpScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
