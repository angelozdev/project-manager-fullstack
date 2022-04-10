import React from "react";
import { Text, Pressable, Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

interface Props {
  name: string;
  _id: string;
}

export default function ProjectItem({ name, _id }: Props) {
  const navigation = useNavigation<ProjectDetailStackProps["navigation"]>();
  return (
    <Pressable
      accessibilityRole="link"
      onPress={() =>
        navigation.navigate("ProjectDetail", {
          _id,
          name,
        })
      }
    >
      {({ isPressed }) => (
        <Box
          px={4}
          py={6}
          bg={isPressed ? "gray.50" : "white"}
          borderBottomWidth={1}
          borderColor="gray.100"
        >
          <Text>{name}</Text>
        </Box>
      )}
    </Pressable>
  );
}
