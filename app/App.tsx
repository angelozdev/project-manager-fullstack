import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { ApolloProvider } from "@apollo/client";

// utils
import { client } from "./src/apollo-client";
import { MainRouter } from "./src/routers";
import { AuthProvider } from "@contexts/auth";

function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <AuthProvider>
          <MainRouter />
        </AuthProvider>
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </ApolloProvider>
  );
}

export default App;
