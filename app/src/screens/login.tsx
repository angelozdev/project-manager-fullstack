import React from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Text,
  Pressable,
} from "native-base";
import { ImageBackground } from "react-native";
import { useLazyQuery } from "@apollo/client";
import { LOG_IN } from "@apollo-client/queries/auth";
import Entypo from "@expo/vector-icons/Entypo";

export default function Login({ navigation }: LoginStackProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [values, setValues] = React.useState({ email: "", password: "" });
  const [login, { data, loading }] = useLazyQuery(LOG_IN, {
    variables: values,
  });

  return (
    <Box safeAreaTop flexGrow={1}>
      <ScrollView flexGrow={1} bg="white">
        <ImageBackground
          resizeMode="cover"
          style={{ width: "100%", height: 250 }}
          source={{
            uri: "https://images.pexels.com/photos/950241/pexels-photo-950241.jpeg?auto=compress&cs=tinysrgb&h=500&w=800",
          }}
        />

        <Box bg="white" p={6} borderTopRadius={32} flexGrow={1} top="-32">
          <Heading mb="4">Iniciar Sesión</Heading>
          <FormControl mb={8}>
            <FormControl.Label>Nombre de usuario</FormControl.Label>
            <Input
              value={values.email}
              onChangeText={(email) => setValues({ ...values, email })}
              variant="underlined"
              _focus={{ borderBottomColor: "gray.400" }}
              placeholder="John Doe"
            />
          </FormControl>

          <FormControl mb={8}>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              value={values.password}
              onChangeText={(password) => setValues({ ...values, password })}
              InputRightElement={
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
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
            onPress={() => login()}
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
        </Box>
      </ScrollView>
    </Box>
  );
}
