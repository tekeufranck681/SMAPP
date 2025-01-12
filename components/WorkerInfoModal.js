import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WorkerInfoModal = ({ visible, worker, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Worker Information</Text>

          {worker ? (
            <View>
              <Text style={styles.workerDetail}>Name: {worker.name || 'Not provided'}</Text>
              <Text style={styles.workerDetail}>Age: {worker.age || 'Not provided'}</Text>
              <Text style={styles.workerDetail}>Phone: {worker.phone || 'Not provided'}</Text>
              <Text style={styles.workerDetail}>Email: {worker.email || 'Not provided'}</Text>
              <Text style={styles.workerDetail}>Start Date: {worker.startDate || 'Not provided'}</Text>
              <Text style={styles.workerDetail}>Date of Birth: {worker.dateOfBirth || 'Not provided'}</Text>
            </View>
          ) : (
            <Text style={styles.workerDetail}>No data available.</Text>
          )}

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  workerDetail: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WorkerInfoModal;
