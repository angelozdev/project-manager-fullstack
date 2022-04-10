import React from "react";
import { View, Text, Box } from "native-base";

export default function Splash() {
  return (
    <Box safeArea flexGrow={1}>
      <View flexGrow={1} alignItems="center" justifyContent="center">
        <Text>Loading...</Text>
      </View>
    </Box>
  );
}
