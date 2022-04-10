type RootStackParamList = {
  Projects: undefined;
  Login: undefined;
  Signup: undefined;
  ProjectDetail: {
    _id: string;
    name: string;
  };
};

type StackScreenProps<T> = import("@react-navigation/stack").StackScreenProps<
  RootStackParamList,
  T
>;

type LoginStackProps = StackScreenProps<"Login">;
type SignupStackProps = StackScreenProps<"Signup">;
type ProjectsStackProps = StackScreenProps<"Projects">;
type ProjectDetailStackProps = StackScreenProps<"ProjectDetail">;
