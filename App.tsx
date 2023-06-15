/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

  GoogleSignin.configure({
      webClientId: '501456111297-6gs3shc7ir8ou537d5us3uepn4cbjcnt.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });

const App = () => {
    const googleSignIn = async () => {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(googleCredential);
    const accessToken = await (await GoogleSignin.getTokens()).accessToken;
    const { email, displayName} = res.user;
    console.log('User Email:', email);
    console.log('Name:', displayName);
    console.log(accessToken);
    Alert.alert('Welcome', `Logged in as ${displayName}`);
  };
  const googleSignout = async() => {
    await GoogleSignin.revokeAccess();
    auth().signOut().then(() => {
      Alert.alert('Log Out', 'Logged Out Successfully');
      console.log('User signout successfully');
    }).catch(e => Alert.alert('Error', e.message));
  }
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn}
        />
        <TouchableOpacity style ={styles.btn} onPress={googleSignout}>
          <Text style={styles.font}>Google Sign-Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    backgroundColor:'#1a73e8',
  },
  font: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  }
});

export default App;