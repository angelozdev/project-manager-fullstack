import React from "react";
import { Text, Box, HStack, Pressable, Icon, View, Heading } from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Props {
  name: string;
  updatedAt: string;
  completed: boolean;
  createdAt: string;
  onCompleted: () => void;
}

export default function TaskItem(props: Props) {
  const { completed, name, updatedAt, onCompleted } = props;

  return (
    <Box bg="white" py={6} px={4} borderBottomWidth={1} borderColor="gray.100">
      <HStack flexGrow={1} justifyContent="space-between" alignItems="center">
        <View>
          <Heading fontWeight="500" mb={2} fontSize="sm">
            {name}
          </Heading>
          <Text fontSize="xs" color="gray.400">
            Creado {new Date(updatedAt).toLocaleDateString()}
          </Text>
          <Text fontSize="xs" color="gray.400">
            Última actualización {new Date(updatedAt).toLocaleDateString()}
          </Text>
        </View>
        <Pressable
          onPress={onCompleted}
          accessibilityRole="button"
          _disabled={{ opacity: 0.2 }}
        >
          {({ isPressed }) => (
            <View
              p={3}
              rounded="full"
              bg={isPressed ? "gray.50" : "transparent"}
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                size={8}
                textAlign="center"
                bg={isPressed ? "gray.50" : "transparent"}
                as={FontAwesome}
                name={completed ? "check-circle" : "check-circle-o"}
                color={completed ? "green.500" : "gray.300"}
              />
            </View>
          )}
        </Pressable>
      </HStack>
    </Box>
  );
}
