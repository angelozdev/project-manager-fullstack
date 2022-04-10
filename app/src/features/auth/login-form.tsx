import React from "react";
import {
  Button,
  FormControl,
  Heading,
  Input,
  Pressable,
  Text,
  View,
} from "native-base";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

// hooks
import useLogin from "./use-login";
import { useShowPassword } from "@hooks";

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const navigation = useNavigation<LoginStackProps["navigation"]>();
  const [showPassword, handleTogglePassword] = useShowPassword();
  const [values, setValues] = React.useState(defaultValues);
  const [handleLogin, { loading }] = useLogin({ data: values });

  const handleValuesChange = (name: string) => (value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const areFieldsFilled = values.email.length && values.password.length;

  return (
    <View>
      <Heading mb="4">Iniciar Sesión</Heading>
      <FormControl mb={8}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          isDisabled={loading}
          value={values.email}
          onChangeText={handleValuesChange("email")}
          variant="underlined"
          _focus={{ borderBottomColor: "gray.400" }}
          placeholder="johndoe@mail.com"
          keyboardType="email-address"
        />
      </FormControl>

      <FormControl mb={8}>
        <FormControl.Label>Contraseña</FormControl.Label>
        <Input
          isDisabled={loading}
          value={values.password}
          onChangeText={handleValuesChange("password")}
          InputRightElement={
            <Pressable
              accessibilityRole="button"
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
          variant="underlined"
          _focus={{ borderBottomColor: "gray.400" }}
          secureTextEntry={!showPassword}
        />
      </FormControl>

      <Button
        isLoading={loading}
        isDisabled={!areFieldsFilled}
        onPress={handleLogin}
        colorScheme="gray"
        rounded="full"
        mb={4}
      >
        <Text fontSize={18} fontWeight="900" color="white">
          Iniciar sesión
        </Text>
      </Button>

      <Button
        isDisabled={loading}
        onPress={() => navigation.navigate("Signup")}
        rounded="full"
        colorScheme="gray"
        variant="link"
      >
        Crear cuenta
      </Button>
    </View>
  );
}
