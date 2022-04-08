import React from "react";
import {
  View,
  Text,
  Heading,
  FormControl,
  Input,
  Pressable,
  Button,
} from "native-base";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

// hooks
import useSignUp from "./use-signup";
import { useShowPassword } from "@hooks";

const defaultValues = {
  email: "",
  name: "",
  password: "",
};

export default function SignUpForm() {
  const [showPassword, handleTogglePassword] = useShowPassword();
  const [values, setValues] = React.useState(defaultValues);
  const [signup, { loading }] = useSignUp({ data: values });
  const navigation = useNavigation<SignupStackProps["navigation"]>();

  const handleValuesChange = (name: string) => (value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <View>
      <Heading mb="4">Crear cuenta</Heading>
      <FormControl mb={8}>
        <FormControl.Label>Nombre de usuario</FormControl.Label>
        <Input
          isDisabled={loading}
          onChangeText={handleValuesChange("name")}
          value={values.name}
          variant="underlined"
          _focus={{ borderBottomColor: "gray.400" }}
          placeholder="John Doe"
        />
      </FormControl>

      <FormControl mb={8}>
        <FormControl.Label>Correo electrónico</FormControl.Label>
        <Input
          isDisabled={loading}
          onChangeText={handleValuesChange("email")}
          variant="underlined"
          value={values.email}
          placeholder="johndoe@mail.com"
          keyboardType="email-address"
          _focus={{ borderBottomColor: "gray.400" }}
        />
      </FormControl>

      <FormControl mb={8}>
        <FormControl.Label>Contraseña</FormControl.Label>
        <Input
          isDisabled={loading}
          InputRightElement={
            <Pressable
              onPress={handleTogglePassword}
              _pressed={{ opacity: 0.8 }}
            >
              <Entypo
                name={showPassword ? "eye-with-line" : "eye"}
                size={24}
                color="gray"
              />
            </Pressable>
          }
          onChangeText={handleValuesChange("password")}
          value={values.password}
          variant="underlined"
          _focus={{ borderBottomColor: "gray.400" }}
          secureTextEntry={!showPassword}
        />
      </FormControl>

      <Button
        onPress={() => signup()}
        isLoading={loading}
        colorScheme="gray"
        rounded="full"
        mb={4}
      >
        <Text fontSize={18} fontWeight="900" color="white">
          Crear cuenta
        </Text>
      </Button>

      <Button
        isDisabled={loading}
        onPress={() => navigation.navigate("Login")}
        rounded="full"
        colorScheme="gray"
        variant="link"
      >
        ¡Ya tengo una cuenta!
      </Button>
    </View>
  );
}
