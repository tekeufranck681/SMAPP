import React, {useEffect} from "react";
import {View,Text,ActivityIndicator,StyleSheet,Image} from "react-native";

const loadingscreen = ({navigation}) => {
       useEffect(() => {
       const timer = setTimeout(() => {
        navigation.replace('Home');
       }, 3000); 
         return () => clearTimeout(timer);
       }, [navigation]);


    return(
    <View style={styles.container}>
        <Image 
            source={require('./assets*/logo.webp')}
            style={styles.image}    
        >
            
        </Image>
        <ActivityIndicator size="large" color="#00ff00"></ActivityIndicator>
        <Text style={styles.text}>Please wait!!!</Text>
    </View>      
    );
}

const styles = StyleSheet.create({
   container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
   },
   text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333'
   },
   image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    
   }

});
export default loadingscreen;
