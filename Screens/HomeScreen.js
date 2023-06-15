import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';

GoogleSignin.configure({
  webClientId: '501456111297-6gs3shc7ir8ou537d5us3uepn4cbjcnt.apps.googleusercontent.com',
});

const Stack = createStackNavigator();

const App = () => {
  const checkUserAuthState = async () => {
    const user = await auth().currentUser;
    if (user) {
      navigation.navigate('HomeScreen');
    }
  };

  useEffect(() => {
    checkUserAuthState();
  }, []);

  const googleSignIn = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
  };

  const googleSignout = async () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signout successfully');
      })
      .catch((e) => Alert.alert('Error', e.message));
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
      />
      <TouchableOpacity style={styles.btn} onPress={googleSignout}>
        <Text style={styles.font}>Google Sign-Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#1a73e8',
  },
  font: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={App} />
      <Stack.Screen name="HomeScreen" component={HomePage} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
