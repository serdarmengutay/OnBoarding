import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardingScreen from './src/screens/OnBoarding';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

function App() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData === null) {
        setIsAppFirstLaunched(true);
        await AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    };
  
    fetchData();
  }, []);
  return (
    isAppFirstLaunched != null && (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppFirstLaunched && (
          <Stack.Screen 
          name="OnboardingScreen" 
          component={OnBoardingScreen}
           />
        )}
        <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
  );
}

export default App;
