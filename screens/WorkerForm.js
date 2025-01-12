import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const WorkerForm = ({ onAddWorker, onCancel }) => {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [errors, setErrors] = useState({});


  const resetForm = () => {
    setName('');
    setPicture('');
    setAge('');
    setDob('');
    setPhone('');
    setEmail('');
    setStartDate('');
  };

  const selectImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    // Pick an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri); // Update the image state
    }
  };


  const handleAddWorker = () => {

    if (name && age) {
      onAddWorker({ name, picture, age, dob, phone, email, startDate });
      resetForm();
    } else {
        const validationErrors = {};
        if (!name.trim()) validationErrors.name = 'Name is required.';
        if (!age.trim()) validationErrors.age = 'Age is required.';
        if (!startDate.trim()) validationErrors.startDate = 'Start date is required.';
      
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.formTitle}>Add Worker</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
    style={styles.input}
    value={name}
    onChangeText={(text) => {
      setName(text);
      setErrors((prev) => ({ ...prev, name: undefined }));
    }}
    placeholder="Enter worker's name"
  />
  {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Picture</Text>
        <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
          {picture ? (
            <Image source={{ uri: picture }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.imageText}>Choose a Picture</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Age</Text>
        <TextInput
    style={styles.input}
    value={age}
    onChangeText={(text) => {
      setAge(text);
      setErrors((prev) => ({ ...prev, age: undefined }));
    }}
    placeholder="Enter worker's age"
    keyboardType="numeric"
  />
  {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}


        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter worker's date of birth (YYYY-MM-DD)"
          value={dob}
          onChangeText={setDob}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
    style={styles.input}
    value={phone}
    onChangeText={(text) => {
      setPhone(text);
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }}
    placeholder="Enter worker's number"
    keyboardType="phone-pad"
  />
  {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}



        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter worker's email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Start Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter start date (YYYY-MM-DD)"
          value={startDate}
          onChangeText={setStartDate}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addWorkerButton} onPress={handleAddWorker}>
            <Text style={styles.addWorkerText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height:50
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    paddingBottom: 100,
    
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007BFF',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    fontSize: 14,
  },
  imagePicker: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  imageText: {
    color: '#007BFF',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addWorkerButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  addWorkerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -6,
  }
});

export default WorkerForm;
