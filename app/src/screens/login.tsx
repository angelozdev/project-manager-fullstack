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

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <ScrollView flexGrow={1} bg="white">
      <Box flexGrow={1}>
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
              variant="underlined"
              _focus={{ borderBottomColor: "gray.400" }}
              placeholder="John Doe"
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

          <Button colorScheme="gray" rounded="full">
            <Text fontSize={18} fontWeight="900" color="white">
              Iniciar sesión
            </Text>
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
}
