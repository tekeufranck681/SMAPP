import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons

const supportedLanguages = ['English', 'Español', 'Français']; // Static list of languages

const Startbtn = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownAnim = new Animated.Value(0); // Animation for dropdown height

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    if (isDropdownVisible) {
      // Hide dropdown
      Animated.timing(dropdownAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsDropdownVisible(false));
    } else {
      // Show dropdown
      setIsDropdownVisible(true);
      Animated.timing(dropdownAnim, {
        toValue: supportedLanguages.length * 40, // Adjust dropdown height based on items
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageSelectorContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
          <Ionicons name="language" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.languageText}>Choose Language</Text>
          <Ionicons name={isDropdownVisible ? 'chevron-up' : 'chevron-down'} size={20} color="#fff" />
        </TouchableOpacity>

        {isDropdownVisible && (
          <Animated.View style={[styles.dropdown, { height: dropdownAnim }]}>
            <FlatList
              data={supportedLanguages}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,

  },
  languageSelectorContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    width: '80%',
    marginTop: -150
  },
  icon: {
    marginRight: 10,
  },
  languageText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 5,
    marginTop: 5,
    width: '100%',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Startbtn;
