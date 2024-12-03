import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion, arrayRemove, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { Calendar } from 'react-native-calendars';

export default function FeelingsPage() {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('😊'); // Default emoji
  const navigation = useNavigation();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const q = query(collection(db, 'entries'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedEntries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(fetchedEntries);
    });
    return () => unsubscribe();
  }, []);

  const handleHeart = async (entryId, likedBy) => {
    const entryRef = doc(db, 'entries', entryId);

    if (likedBy.includes(userId)) {
      await updateDoc(entryRef, {
        hearts: likedBy.length - 1,
        likedBy: arrayRemove(userId),
      });
    } else {
      await updateDoc(entryRef, {
        hearts: likedBy.length + 1,
        likedBy: arrayUnion(userId),
      });
    }
  };

  const handleBookmark = async (entryId, bookmarked) => {
    const entryRef = doc(db, 'entries', entryId);
    await updateDoc(entryRef, {
      bookmarked: !bookmarked,
    });
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const saveEntry = async () => {
    const newEntry = {
      text: `Feeling ${selectedEmoji} on ${selectedDate}`,
      timestamp: new Date(),
      hearts: 0,
      likedBy: [],
      bookmarked: false,
      date: selectedDate,
      emoji: selectedEmoji,
    };

    await addDoc(collection(db, 'entries'), newEntry);
    setModalVisible(false);
    setSelectedDate('');
    setSelectedEmoji('😊');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How do you feel today?</Text>

      <TouchableOpacity
        style={styles.calendarButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.calendarButtonText}>📅 Open Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Entry')}
      >
        <Text style={styles.addButtonText}>Add a new entry...</Text>
      </TouchableOpacity>

      <ScrollView>
        {entries.map((entry) => (
          <View key={entry.id} style={styles.entry}>
            <View style={styles.entryContent}>
              <Text style={styles.entryText}>{entry.text}</Text>
              <Text style={styles.entryDate}>{entry.timestamp.toDate().toDateString()}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => handleHeart(entry.id, entry.likedBy || [])}
              >
                {entry.likedBy?.includes(userId) ? (
                  <Text style={styles.heartIcon}>❤️</Text>
                ) : (
                  <Text style={styles.heartIcon}>🤍</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bookmarkButton}
                onPress={() => handleBookmark(entry.id, entry.bookmarked)}
              >
                <Text style={styles.bookmarkIcon}>
                  {entry.bookmarked ? '🔖' : '📌'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Date</Text>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
              }}
            />
            <View style={styles.emojiContainer}>
              {/* Emoji Selection */}
              {['😊', '😢', '😡', '😄'].map((emoji) => (
                <Text
                  key={emoji}
                  onPress={() => handleEmojiSelect(emoji)}
                  style={[
                    styles.emoji,
                    selectedEmoji === emoji && styles.selectedEmoji,
                  ]}
                >
                  {emoji}
                </Text>
              ))}
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
              <Text style={styles.saveButtonText}>Save Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendarButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  entry: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryContent: {
    flex: 1,
    marginRight: 10,
  },
  entryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  entryDate: {
    fontSize: 12,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartButton: {
    padding: 10,
  },
  heartIcon: {
    fontSize: 24,
  },
  bookmarkButton: {
    padding: 10,
  },
  bookmarkIcon: {
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  emojiContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  emoji: {
    fontSize: 30,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedEmoji: {
    backgroundColor: '#ADD8E6', // Light blue for selected emoji
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
