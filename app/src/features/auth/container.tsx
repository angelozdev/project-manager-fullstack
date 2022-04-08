import { Box, ScrollView } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";

interface Props {
  children: React.ReactNode;
  backgroundURL: string;
}

export default function Container({ children, backgroundURL }: Props) {
  return (
    <Box safeAreaTop flexGrow={1}>
      <ScrollView flexGrow={1} bg="white">
        <ImageBackground
          resizeMode="cover"
          style={{ width: "100%", height: 250 }}
          source={{ uri: backgroundURL }}
        />

        <Box bg="white" p={6} borderTopRadius={32} flexGrow={1} top="-32">
          {children}
        </Box>
      </ScrollView>
    </Box>
  );
}
