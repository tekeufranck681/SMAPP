import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import WorkerScreen from './WorkerScreen';
import ReportScreen from './ReportScreen';
import SettingsScreen from './SettingsScreen';
import Footer from '../components/Footer';


const Tab = createMaterialTopTabNavigator();

const Allstart = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Worker':
                iconName = 'account';
                break;
              case 'Report':
                iconName = 'file-document';
                break;
              case 'Settings':
                iconName = 'cog';
                break;
              default:
                iconName = 'help';
            }

            return <Icon name={iconName} size={24} color={color} />;
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarIndicatorStyle: { backgroundColor: '#007BFF' },
          tabBarStyle: { backgroundColor: '#fff' },
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: '#999',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Worker" component={WorkerScreen} />
        <Tab.Screen name="Report" component={ReportScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
        <Footer/>
      </>
  );
};



export default Allstart;
