import React from 'react';
import {Text, StyleSheet, View, ImageBackground, StatusBar, TouchableOpacity} from 'react-native';
import COLORS from '../consts/colors';
const OnBoardScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{flex: 1}}
        source={require('../images/onboardImage.jpg')}
      />
      <View style={styles.details}>
        <Text style={{color: COLORS.white, fontSize: 35, fontWeight: 'bold'}}>
          Discover{`\n`}
          world with us
        </Text>
        <Text style={{color: COLORS.white, lineHeight: 25, marginTop: 15}}>
          lorem ipsum dolor sit amet consectetyr adipiscing elit, proin ut sem
          non erat cehicuula dignissim morbi eget congue ante feygiat
        </Text>
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('HomeScreen')}>
        <View style={styles.btn}> 
        <Text style={{fontWeight: 'bold', color: COLORS.black}}>Get Started</Text>
        </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  details: {
    height: '50%',
    bottom: 0,
    position: 'absolute',
    paddingHorizontal: 40,
  },
  btn: {
    height: 50,
    width:  120,
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default OnBoardScreen;
