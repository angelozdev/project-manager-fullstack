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
import Entypo from "@expo/vector-icons/Entypo";

export default function Signup({ navigation }: SignupStackProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Box flexGrow={1} safeAreaTop>
      <ScrollView flexGrow={1} bg="white">
        <ImageBackground
          resizeMode="cover"
          style={{ width: "100%", height: 250 }}
          source={{
            uri: "https://images.pexels.com/photos/1557183/pexels-photo-1557183.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          }}
        />

        <Box bg="white" p={6} borderTopRadius={32} flexGrow={1} top="-32">
          <Heading mb="4">Crear cuenta</Heading>
          <FormControl mb={8}>
            <FormControl.Label>Nombre de usuario</FormControl.Label>
            <Input
              variant="underlined"
              _focus={{ borderBottomColor: "gray.400" }}
              placeholder="John Doe"
            />
          </FormControl>

          <FormControl mb={8}>
            <FormControl.Label>Correo electrónico</FormControl.Label>
            <Input
              variant="underlined"
              placeholder="johndoe@mail.com"
              _focus={{ borderBottomColor: "gray.400" }}
            />
          </FormControl>

          <FormControl mb={8}>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
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

          <Button colorScheme="gray" rounded="full" mb={4}>
            <Text fontSize={18} fontWeight="900" color="white">
              Crear cuenta
            </Text>
          </Button>

          <Button
            onPress={() => navigation.navigate("Login")}
            rounded="full"
            colorScheme="gray"
            variant="link"
          >
            ¡Ya tengo una cuenta!
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
}
