// WorkerScreen.js
import React, { useState}from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import WorkerForm from './WorkerForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import WorkerInfoModal from '../components/WorkerInfoModal';
import UpdateWorkerForm from './UpdateWorkerForm';


const WorkerScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  useEffect(() => {
    const loadWorkers = async () => {
      try {
        const workersData = await AsyncStorage.getItem('workers');
        if (workersData) {
          setWorkers(JSON.parse(workersData)); // Load stored workers
        }
      } catch (error) {
        console.error('Error loading workers from AsyncStorage', error);
      }
    };

    loadWorkers();
  }, []);
  



  const handleAddWorker = async (worker) => {
    try {
    setWorkers([...workers, { id: Date.now(), ...worker }]);
    setShowForm(false);
    await AsyncStorage.setItem('workers', JSON.stringify([...workers, { id: Date.now(), ...worker }]));

    }catch (error) {
      console.error('Error saving worker data to AsyncStorage', error);
    }
  };

  const handleRemoveWorker = async (workerName) => {
    try{
    Alert.alert(
      'Remove Worker',
      `Are you sure you want to remove ${workerName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            // Logic to remove the worker
            console.log(`${workerName} removed`);
            setWorkers(workers.filter((worker) => worker.name !== workerName));
          },
        },
      ],
      { cancelable: true }
    );
    await AsyncStorage.setItem('workers', JSON.stringify(workers.filter((worker) => worker.name !== workerName)));
  } catch (error) {
    console.error('Error removing worker data from AsyncStorage', error);
  } 
  };

  // Handle opening the modal when a worker card or picture is clicked
  const openWorkerInfo = (worker) => {
    setSelectedWorker(worker);
    setModalVisible(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedWorker(null);
  };
   
   // Update worker handler
   const handleUpdateWorker = (updatedWorker) => {
    const updatedWorkers = workers.map((worker) =>
      worker.id === updatedWorker.id ? updatedWorker : worker
    );
    setWorkers(updatedWorkers);
    setIsUpdateModalVisible(false);
  };


  return (
    <View style={styles.container}>
      {showForm ? (
        <WorkerForm onAddWorker={handleAddWorker} onCancel={() => setShowForm(false)} />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.workerList}>
            {workers.map((worker) => (
              <TouchableOpacity key={worker.id} style={styles.workerCard}
                onPress={()=> openWorkerInfo(worker)}>
                <View style={styles.workerInfo}>
                  {worker.image ? (<Image
                    source={{ uri: worker.picture }}
                    style={styles.workerImage}
                  />):(
                    <View style={styles.workerImagePlaceholder}>
                     <Image
                    source={{ uri: worker.picture }}
                    style={styles.workerImage}
                  />
                  </View>
                  )}
                  <Text style={styles.workerName}>{worker.name}</Text>
                </View>
                <View style={styles.workerActions}>
                  <TouchableOpacity style={styles.updateButton}
                  onPress={() => {
                    setSelectedWorker(worker);
                    setIsUpdateModalVisible(true);
                  }}
                  >

                    <Text style={styles.updateText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveWorker(worker.name)}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </>
      )}

           {/* Pass required props to WorkerInfoModal */}
           <WorkerInfoModal
        visible={modalVisible}
        worker={selectedWorker}
        onClose={closeModal}
      />

           {/* Update Worker Modal */}
           {selectedWorker && (
        <UpdateWorkerForm
          visible={isUpdateModalVisible}
          worker={selectedWorker}
          onClose={() => setIsUpdateModalVisible(false)}
          onSave={handleUpdateWorker}
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  workerList: {
    padding: 20,
    paddingBottom: 100
  },
  workerCard: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  workerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#007BFF',
    marginRight: 10,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginLeft: 140
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10
  },
  removeButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 5,
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 60
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default WorkerScreen;
