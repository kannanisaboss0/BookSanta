import {DrawerItems} from 'react-navigation-drawer'
import *as React from 'react'
import firebase from 'firebase'
import {StyleSheet,View,TouchableOpacity,Text,} from 'react-native'
import {Avatar} from 'react-native-elements'
import ImagePicker from 'expo-image-picker'
import *as Permissions from 'expo-permissions'
import db from '../config.js'


export default class CustomSideBar extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            image:'#',
            name:'',
            docId:''
        }
    }
    selectPicture=async()=>{
        const {Canceled,URL}=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(!Canceled){
            this.uploadImage(URL,this.state.userId)
        }
    }
    uploadImage=async(URL,imageName)=>{
        var Response=await fetch (URL) 
        var Blob =await Response.blob()
        var Reference=firebase.storage().ref().child("User_Profiles/"+imageName)
        return Reference.put(Blob).then((response)=>{
            this.fetchImage(imageName)
        })
    }
    fetchImage=(imageName)=>{
        var Reference=firebase.storage().ref().child("User_Profiles/"+imageName)
        Reference.getDownloadURL().then((URL)=>{
            this.setState({
                image:URL
            })
        }).catch((err)=>{
            this.setState({
                image:'#'
            })
        })
    }
    getUserProfile=()=>{
        db.collection("users").where("emailId","==",this.state.userId).onSnapshot((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    name:doc.data().firstName,
                    docId:doc.id
                })
            })
        })
    }
    componentDidMount(){
        this.fetchImage(this.state.userId)
        this.getUserProfile()
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.5,alignItems:"center",backgroundColor:"#c2c2c2"}}>
                <Avatar
                rounded={true}
                source={{uri:this.state.image}}
                size='medium'
                onPress={()=>{
                    this.selectPicture()
                }}
                showEditButton={true}
                containerStyle={{flex:0.75,width:"40%",height:"20%",marginLeft:20,marginTop:30,borderRadius:40}}
                />
                <Text style={{fontWeight:"bold",fontSize:20,paddingTop:10}}>{this.state.name}</Text>
                </View>
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
