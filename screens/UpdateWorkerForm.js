import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UpdateWorkerForm = ({ visible, worker, onClose, onSave }) => {
  const [updatedWorker, setUpdatedWorker] = useState({ ...worker });
  const [editableFields, setEditableFields] = useState({
    name: false,
    age: false,
    phone: false,
    email: false,
    startDate: false,
    dateOfBirth: false,
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setUpdatedWorker({ ...updatedWorker, [field]: value });
  };

  const handleSave = () => {
    // Pass updated worker details, including the image, to the parent component
    onSave({
      id: updatedWorker.id,
      name: updatedWorker.name,
      age: updatedWorker.age,
      phone: updatedWorker.phone,
      email: updatedWorker.email,
      startDate: updatedWorker.startDate,
      dateOfBirth: updatedWorker.dateOfBirth,
      picture: updatedWorker.image, // Ensure the latest image URI is included here
    });
  };
  

  // Handle image selection
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUpdatedWorker({ ...updatedWorker, image: result.assets[0].uri });
    }
  };

  // Enable specific input field for editing
  const enableFieldEditing = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };
  

   

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.title}>Update Worker</Text>

          {/* Worker Image */}
          <View style={styles.imageWrapper}>
           
            <Image
              source={{ uri: updatedWorker.image }}
              style={styles.workerImage}
            />
            <TouchableOpacity style={styles.editImageButton} onPress={handleImagePick}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          {['name', 'age', 'phone', 'email', 'startDate', 'dateOfBirth'].map((field) => (
            <View key={field} style={styles.inputWrapper}>
              <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}:</Text>
              <View
                style={[
                  styles.inputContainer,
                  editableFields[field] && styles.editableInputContainer,
                ]}
              >
                <TextInput
                  style={styles.input}
                  value={updatedWorker[field]}
                  editable={editableFields[field]}
                  onChangeText={(value) => handleInputChange(field, value)}
                  placeholder={`Enter ${field}`}
                />
                <TouchableOpacity onPress={() => enableFieldEditing(field)}>
                  <Text style={styles.editIcon}>✏️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  workerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#007BFF',
    borderWidth: 2,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    padding: 5,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  editableInputContainer: {
    borderColor: '#007BFF',
    backgroundColor: '#f0f8ff',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  editIcon: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007BFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UpdateWorkerForm;
