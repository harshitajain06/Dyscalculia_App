import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
        <ScrollView style={styles.collapseContent}>
          <Text style={styles.description}>
            Dyscalculia is a learning disorder that affects a person’s ability to understand
            number-based information and math. People who have dyscalculia struggle with numbers
            and math because their brains don’t process math-related concepts like the brains of
            people without this disorder. However, their struggles don’t mean they’re less
            intelligent or less capable than people who don’t have dyscalculia. People who have
            dyscalculia often face mental health issues when they have to do math, such as anxiety,
            depression, and other difficult feelings. People who have dyscalculia are neurodivergent.
            Neurodiversity is a term that describes how no two people have the same brain, and
            everyone’s brain forms and develops in a completely unique way. For people with
            dyscalculia, that means their brain works differently from the brain of someone who
            doesn’t have disorders or conditions that affect how their brain works.
          </Text>
          <Text style={styles.description}>
            Dyscalculia can happen to anyone, but it’s common for it first to draw attention when
            children are in their first few years of elementary school (between ages 6 and 9). The
            symptoms of this disorder usually appear in childhood, especially when children learn
            how to do basic math. However, many adults have dyscalculia and don’t know it. There’s
            also a form of dyscalculia that appears later in life. This form, acquired dyscalculia,
            can happen at any age. This usually happens for other reasons like a medical condition.
          </Text>
        </ScrollView>
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
    maxHeight: '80%', // Limit height to avoid layout overflow
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
