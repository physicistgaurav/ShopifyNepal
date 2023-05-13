import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});
