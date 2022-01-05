import React from "react";
import { Button, ScrollView, Text } from "react-native";
import useRedditAuth from "@/hooks/useRedditAuth";

export const LoginScreen = ({ navigation }: any) => {
  const { authRequest, isAuthenticated, authenticateAsync } = useRedditAuth();

  if (isAuthenticated) {
    navigation.navigate("Main");
  }

  return (
    <ScrollView>
      <Text>Looks like you haven't logged in yet</Text>
      <Text>Press to login</Text>
      <Button
        disabled={!authRequest}
        title="Login"
        onPress={() => {
          authenticateAsync();
        }}
      />
    </ScrollView>
  );
};
