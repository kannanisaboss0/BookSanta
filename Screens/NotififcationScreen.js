import React from 'react'
import {View,Text,TouchableOpacity,FlatList,StyleSheet,} from 'react-native'
import db from '../config.js'
import firebase from 'firebase'
import MyHeader from '../Components/MyHeader.js'
import {ListItem,Card,Icon} from 'react-native-elements'
import SwipableFlatList from '../Components/SwipableFlatList.js'

export default class NotificationScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[],

        }
        this.notificationRef=null
    }
    getAllNotification=()=>{
        db.collection('AllNotifications').where("targetUserId","==",this.state.userId).where("Status","==","unread").onSnapshot((snapshot)=>{
            var AllNotifications=[]
            snapshot.docs.map((document)=>{
              var Notification=  document.data()
              Notification["docId"]=document.id
              AllNotifications.push(Notification)
            })
            this.setState({
                allNotifications:AllNotifications
            })
        })
    }
    componentDidMount(){
        this.getAllNotification()
    }
    componentWillUnmount(){
        this.notificationRef=null
    }
    renderItem=({item,i})=>{
        return(
            <ListItem
            key={i}
            leftElement={<Icon name="book"type="font-awsome" color="#696969"></Icon>}
            title={item.Bookname}
            subTitle={item.Message}
            titleStyle={{color:"black",fontWeight:"bold"}}
            bottomDivider

            />
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="My Donations" navigation={this.props.navigation}/>
                <View style={{flex:1}}>
                   {this.state.allNotifications.length===0?
                   (
                       <View style={{flex:1,alignItems:"cneter",jusitfyContent:"center"}}>
                           <Text style={{fontSize:20}}>No Notifications Currently</Text>
                       </View>
                   ):
                   (<SwipableFlatList AllNotifications={this.state.allNotifications}/>)
               }
                </View>
            </View>
        )
    }
}