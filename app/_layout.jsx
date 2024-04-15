import React from "react";
import { Slot, Stack } from "expo-router";
import { Text } from "react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};
export default RootLayout;
