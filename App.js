import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Permissions } from 'react-native';
import { SMS } from 'expo';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up s.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
  