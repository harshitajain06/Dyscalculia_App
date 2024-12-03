import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Superpower = () => {
    const navigation = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Understanding your superpower</Text>
      
      {/* Collapsible Section */}
      <TouchableOpacity style={styles.collapseHeader} onPress={toggleCollapse}>
        <Text style={styles.collapseText}>What it is</Text>
        <Text style={styles.collapseArrow}>{isCollapsed ? '🔽' : '🔼'}</Text>
      </TouchableOpacity>
      
      {!isCollapsed && (
        <View style={styles.collapseContent}>
          <Text style={styles.description}>
            Ilo inventore veritatis et quasi architecto "Sed ut perspiciatis unde omnis iste natus error sit"...
          </Text>
          <View style={styles.placeholderImage} />
          <Text style={styles.description}>
            More text content explaining what it is in detail.
          </Text>
        </View>
      )}
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
  collapseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FF6347',
    borderRadius: 8,
  },
  collapseText: {
    color: '#fff',
    fontSize: 16,
  },
  collapseArrow: {
    fontSize: 16,
    color: '#fff',
  },
  collapseContent: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    backgroundColor: '#FDFD96',
    padding: 10,
    borderRadius: 5,
  },
  placeholderImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginBottom: 16,
  },
});

export default Superpower;