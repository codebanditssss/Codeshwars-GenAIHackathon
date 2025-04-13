import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    console.log('Login screen mounted');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: '#000',
  },
}); 