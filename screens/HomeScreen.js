import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Add Worker Section */}
      <TouchableOpacity style={styles.card} onPress={() => alert('Add Worker clicked')}>
        <Icon name="account-plus" size={30} color="#007BFF" style={styles.icon} />
        <Text style={styles.cardText}>Add Worker</Text>
      </TouchableOpacity>

      {/* Add Report Section */}
      <TouchableOpacity style={styles.card} onPress={() => alert('Add Report clicked')}>
        <Icon name="file-document-edit" size={30} color="#007BFF" style={styles.icon} />
        <Text style={styles.cardText}>Add Report</Text>
      </TouchableOpacity>

        {/* Generate Payment Section */}
        <TouchableOpacity style={styles.card} onPress={() => alert('Generate Payment clicked')}>
        <Icon name="cash-multiple" size={30} color="#007BFF" style={styles.icon} />
        <Text style={styles.cardText}>Generate Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: -300
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    width: '90%',
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;

