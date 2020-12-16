import *as React from 'react'
import {Image} from 'react-native'
import  {createBottomTabNavigator} from  'react-navigation-tabs'
import BookDonateScreen from '../Screens/BookDonateScreen'
import BookRequestScreen from '../Screens/BookRequestScreen'
import {AppStackNavigator} from './AppStackNavigator'

  const AppTabNavigator=createBottomTabNavigator({
Donate:{screen:AppStackNavigator,navigationOptions:{tabBarIcon:<Image source={require('../assets/Donate.PNG')} style={{width:20,height:20}}/>,tabBarLabel:'Donate Books'}},
Request:{screen:BookRequestScreen,navigatorOptions:{tabBarIcon:<Image source={require('../assets/Request.PNG')} style={{width:20,height:20}}/>,tabBarLabel:'Request Books'}}



},{
  initialRouteName:'Donate'
}
)
export default AppTabNavigator