import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  { id: '1', name: 'Addition', route: 'AdditionQuiz', icon: 'plus' },
  { id: '2', name: 'Subtraction', route: 'SubtractionQuiz', icon: 'minus' },
  { id: '3', name: 'Multiplication', route: 'MultiplicationQuiz', icon: 'close' },
  { id: '4', name: 'Division', route: 'DivisionQuiz', icon: 'division' },
];

const CustomExercises = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter exercises based on search query
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.route)} // Navigate to the respective quiz
    >
      <View style={styles.placeholderImage}>
        <Icon name={item.icon} size={40} color="#333" />
      </View>
      <Text style={styles.text}>{item.name}</Text>
      <TouchableOpacity>
        <Text style={styles.heart}>❤️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom exercises just for you!</Text>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={24} color="#333" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  grid: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 8,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeholderImage: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
  },
  heart: {
    marginTop: 8,
    fontSize: 20,
    color: 'red',
  },
});

export default CustomExercises;
