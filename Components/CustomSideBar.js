import {DrawerItems} from 'react-navigation-drawer'
import *as React from 'react'
import firebase from 'firebase'
import {StyleSheet,View,TouchableOpacity,Text} from 'react-native'

export default class CustomSideBar extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.8}}>
                    <DrawerItems {...this.props} >
                        
                    </DrawerItems>
                </View>
                <View style={{flex:0.2,justifyContent:"flex-end",paddingBottom:30}}>
                    <TouchableOpacity style={{height:30,width:"100%",justifyContetn:"center",padding:10}} onPress={()=>{
                        this.props.navigation.navigate("Welcome")
                        firebase.auth().signOut()
                    }}>
                        <Text style={{fontSize:30,fontWeight:"bold"}}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
