import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupPage = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Battling your</Text>
      <Text style={styles.headerSubtitle}>DYSCALCULIA</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Sign up to the app!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D95951', // Cherry color for background
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    color: 'white',
    fontWeight: '400',
    marginBottom: 0,
  },
  headerSubtitle: {
    fontSize: 28,
    color: 'white',
    fontWeight: '700',
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#386e5a', // Deep green color for button
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: 'white', // White text
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SignupPage;