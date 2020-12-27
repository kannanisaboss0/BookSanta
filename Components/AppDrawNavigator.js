import *as React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import AppTabNavigator from './AppTabNavigator.js'
import CustomSideBar from './CustomSideBar.js'
import Settings from '../Screens/Settings.js'
import MyDonationScreen from '../Screens/MyDonations.js'
import NotificationScreen from '../Screens/NotififcationScreen'
import MyRecievedBooksListScreen from '../Screens/MyRecievedBooksList.js'


 const AppDrawNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    Settings:{screen:Settings},
    MyDonations:{screen:MyDonationScreen,navigationOptions:{drawerLabel:'My Donations'}},
    Notifications:{screen:NotificationScreen},
    RecievedBooks:{screen:MyRecievedBooksListScreen}

},
{contentComponent:CustomSideBar},
{intialRouteName:"Home"}
)
export default AppDrawNavigator

