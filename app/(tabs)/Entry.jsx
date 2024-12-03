import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Make sure this path matches your firebase config file

const Entry = () => {
  const [text, setText] = useState('');

  const handleSaveEntry = async () => {
    if (text.trim()) {
      try {
        await addDoc(collection(db, 'entries'), {
          text,
          timestamp: new Date(), // Add a timestamp for ordering
        });
        Alert.alert('Success', 'Entry saved successfully!');
        setText(''); // Clear input after saving
      } catch (error) {
        Alert.alert('Error', 'Could not save entry. Please try again.');
      }
    } else {
      Alert.alert('Warning', 'Please write something before saving.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Write how you feel!</Text>
      </View>
      <TextInput
        style={styles.textArea}
        placeholder="Begin here..."
        placeholderTextColor="#888"
        multiline={true}
        numberOfLines={10}
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
        <Text style={styles.saveButtonText}>Save Entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  headerContainer: {
    backgroundColor: '#F66',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textArea: {
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    height: 400,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#2E8B57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Entry;
