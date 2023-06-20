import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

export default function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const subscription = SmsListener.addListener((message) => {
      setMessage(message.body);
    });

    return () => {
      subscription.remove(); // Clean up the listener when the component unmounts
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{message}Salam</Text>
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
