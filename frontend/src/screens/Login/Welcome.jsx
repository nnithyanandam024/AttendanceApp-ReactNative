import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './WelcomeStyle';
import React from 'react';
import WelcomeImg from '../../assets/Login/EdunestLogoLogin.svg';

const Welcome = ({navigation}) => { 
  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          
          {/* <Text style={styles.title}>EDVANTA</Text> */}
        
          {/* <Image source={WelcomeImg} style={styles.image} /> */}
          <WelcomeImg style={styles.logimg} />
          <Text style={styles.mainText}>-Team DEVNEST11</Text>
          <Text style={styles.text2}>
            "Welcome back! Please log {"\n"}in to continue" 
          </Text>
          <TouchableOpacity 
            style={styles.pressablebtn} 
            onPress={() => navigation.navigate('Login')} 
          >
            <View style={styles.btn}>
              <Text style={styles.btntext}>LOGIN</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    
  );
};

export default Welcome;