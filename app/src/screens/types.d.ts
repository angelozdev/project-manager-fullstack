type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
};

type StackScreenProps<T> = import("@react-navigation/stack").StackScreenProps<
  RootStackParamList,
  T
>;

type LoginStackProps = StackScreenProps<"Login">;
type SignupStackProps = StackScreenProps<"Signup">;
