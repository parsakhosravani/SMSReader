import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Permissions } from 'react-native';
import { SMS } from 'expo';

export default function App() {
  useEffect(() => {
    requestReadSMSPermission();
    startSMSListener();

    // Clean up the listener on component unmount
    return () => {
      stopSMSListener();
    };
  }, []);

  const requestReadSMSPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.SMS);
      if (status !== 'granted') {
        console.log('SMS permission denied');
      }
    } catch (error) {
      console.log('Error requesting SMS permission:', error);
    }
  };

  const startSMSListener = () => {
    SMS.addSMSListener((event) => {
      if (event.originatingAddress === 'SPECIFIC_NUMBER') {
        const messageContent = event.body;
        const senderNumber = event.originatingAddress;

        sendMessageToTelegram(messageContent, senderNumber);
        console.log('Received SMS:', messageContent);
      }
    });
  };

  const stopSMSListener = () => {
    SMS.removeSMSListener();
  };

  const sendMessageToTelegram = (message, sender) => {
    // Implement the logic to send the message to Telegram using your Telegram bot API
    // Replace the placeholders with your actual bot token and user ID
    const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
    const USER_ID = 'YOUR_TELEGRAM_USER_ID';

    // Make the HTTP request to send the message to Telegram
    // Replace the API URL with the appropriate endpoint of the Telegram Bot API
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: USER_ID,
        text: `Received SMS from ${sender}: ${message}`,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Message sent to Telegram:', data);
      })
      .catch(error => {
        console.error('Error sending message to Telegram:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
  