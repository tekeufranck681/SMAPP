import React , {useState} from "react";
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import Icon  from "react-native-vector-icons/MaterialIcons";
import Startbtn from "../components/Startbtn";
import Getstart from "../components/Getstart";
const login = () =>{
   
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SMAPP</Text>
        <Text style={styles.text1}>GET STARTED!!</Text>
        <Text style={styles.text2}>Welcome  to SMAPP. It is an App which helps
             you to manage your workers in a site 
             organisation. By clicking "GET STARTED" 
             you accept our Terms and Conditions. </Text>

        <Startbtn/>

        <Getstart/>
      
      </View>

    );
}
const styles= StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: '#fff'
       },
       text: {
        marginTop: 150,
        fontSize: 60,
        color: '#4169E1',
        letterSpacing: 3,
        fontWeight: 'bold'
       },
       text1:{
        justifyContent: 'center',
        marginTop: 20,
        color: '#4169E1',
        fontSize: 18
       },
       text2: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        marginTop: 0
       },
       button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#007BFF',
        borderRadius: 20,
        marginTop: -300,
      },
      icon: {
        marginRight: 10,
      },
      languageText: {
        color: '#fff',
        fontSize: 16,
      }
});
export default login;