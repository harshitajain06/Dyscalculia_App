import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SubtractionQuiz = () => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [feedbackColor, setFeedbackColor] = useState('#000'); // Default feedback color
  
    // Generate random numbers for the question
    const generateRandomNumbers = () => {
      const randomNum1 = Math.floor(Math.random() * 10) + 1;
      const randomNum2 = Math.floor(Math.random() * 10) + 1;
      setNum1(randomNum1);
      setNum2(randomNum2);
    };
  
    // Start with the first question
    useEffect(() => {
      generateRandomNumbers();
    }, []);
  
    const handleSubmit = () => {
      if (isQuizComplete) return;
  
      const correctAnswer = num1 - num2;
      if (parseInt(userAnswer) === correctAnswer) {
        setScore(score + 1);
        setFeedback('🎉 Correct! Great job!');
        setFeedbackColor('green'); // Green for correct answers
      } else {
        setFeedback('😕 Oops! Try again.');
        setFeedbackColor('red'); // Red for incorrect answers
      }
  
      if (questionCount < 9) {
        setQuestionCount(questionCount + 1);
        generateRandomNumbers();
        setUserAnswer('');
      } else {
        setIsQuizComplete(true);
      }
    };
  
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/backapp1.jpg')} style={styles.backgroundImage} />
        {!isQuizComplete ? (
          <>
            <Text style={styles.question}>
              What is {num1} - {num2}?
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={userAnswer}
              onChangeText={(text) => setUserAnswer(text)}
              placeholder="Enter answer"
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              style={[styles.button, isQuizComplete ? styles.disabledButton : null]}
              onPress={handleSubmit}
              disabled={isQuizComplete}
            >
              <Text style={styles.buttonText}>Submit 🚀</Text>
            </TouchableOpacity>
            {feedback !== '' && <Text style={[styles.feedback, { color: feedbackColor }]}>{feedback}</Text>}
          </>
        ) : (
          <Text style={styles.completedText}>🎉 Quiz Complete! Your score: {score}/10</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'white',
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.6,
    },
    question: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#000',
      textShadowColor: '#FFF176',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    input: {
      borderWidth: 2,
      borderColor: '#0288D1',
      padding: 10,
      width: '80%',
      marginBottom: 20,
      borderRadius: 20,
      backgroundColor: '#FFF',
      textAlign: 'center',
      fontSize: 24,
      color: '#000',
    },
    button: {
      backgroundColor: '#F57C00',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 50,
      marginTop: 10,
    },
    disabledButton: {
      backgroundColor: '#aaa',
    },
    buttonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    feedback: {
      fontSize: 24,
      marginTop: 16,
      fontWeight: 'bold',
    },
    completedText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#4CAF50',
      textAlign: 'center',
      padding: 20,
      backgroundColor: '#FFF176',
      borderRadius: 10,
    },
  });

export default SubtractionQuiz;
