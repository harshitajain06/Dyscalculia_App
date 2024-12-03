import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
  const navigation = useNavigation();
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(null);

  useEffect(() => {
    if (user) {
      navigation.replace('Home');
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Show success alert
      Alert.alert('Success', 'Logged in successfully!');

      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Logged in successfully!',
      });

      // Navigate to the home screen or dashboard
      navigation.navigate('Home');
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This user account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'There is no user record corresponding to this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'The password is incorrect.';
          break;
        default:
          errorMessage = 'An unknown error occurred. Please try again later.';
      }

      // Show error alert
      Alert.alert('Error', errorMessage);

      // Show error toast
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={[
          styles.input,
          { borderColor: isFocused === 'email' ? '#386e5a' : '#ccc' }
        ]}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setIsFocused('email')}
        onBlur={() => setIsFocused(null)}
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: isFocused === 'password' ? '#386e5a' : '#ccc' }
        ]}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onFocus={() => setIsFocused('password')}
        onBlur={() => setIsFocused(null)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D95951', // Cherry red background
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    padding: 35,
  },
  button: {
    backgroundColor: '#386e5a', // Deep green button
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 20, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: 'white', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: 'white',
    fontSize: 16,
  },
  registerLink: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
