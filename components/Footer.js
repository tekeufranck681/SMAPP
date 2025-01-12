import React from 'react';
import { View, Text, StyleSheet,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Footer = () => {
  return (
    <View style={styles.footer}>
        <Image 
                  source={require('../screens/assets*/logo.webp')}
                  style={styles.image}    
              >
                  
              </Image>
      <Text style={styles.footerText}>SMAPP</Text>
      <View style={styles.profileContainer}>
        <Icon name="account-circle" size={40} color="#007BFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginLeft: -160
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 20

}
});

export default Footer;
