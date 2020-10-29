import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './Screens/Welcome.js'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import AppTabNavigator from './Components/AppTabNavigator'

export default class App extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Container/>
      </View>
    );

  }
  
}
const SwitchNavigator=createSwitchNavigator({
 Welcome:{screen:Welcome},
 BottomTab:{screen:AppTabNavigator}
})
const Container=createAppContainer(SwitchNavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
