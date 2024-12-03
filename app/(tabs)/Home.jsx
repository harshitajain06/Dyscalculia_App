import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What do you want to do today?</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Superpower')} // Navigates to ConditionPage
      >
        <Text style={styles.buttonText}>Read up on my condition</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('CustomExercises')} // Navigates to FunPage
      >
        <Text style={styles.buttonText}>Start the fun!</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('FeelingsPage')} // Navigates to JourneyPage
      >
        <Text style={styles.buttonText}>Write about my journey</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D95951', // Cherry red background
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2B5D34', // Forest green button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default HomePage;
