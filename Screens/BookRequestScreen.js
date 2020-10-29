import *as React from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Modal,ScrollView,KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import Myheader from '../Components/Myheader.js'

export default class BookRequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            bookName:'',
            reasonToRequest:'',


    }
}

    createUniqueId=()=>{
        return(
            Math.random().toString(36).substring(7)
        )
    }
    addRequest=(bookName,reasonRequest)=>{
        var userID=this.state.userId 
        var randomRequestId=this.createUniqueId()
        var reason=reasonRequest
        var book=bookName
        db.collection("request").add({
            "Username":userID,
            "Bookname":book,
            "Reasonforrequest":reason,
            "RequestID":randomRequestId
        })
    }
    render(){
        return(
            <View style={{flex:1,width:"100%"}}>
                <Myheader title="Request Book"/>
                <KeyboardAvoidingView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <TextInput
                style={Styles.formTextInput}
                value={this.state.bookName}
                placeholder="Enter book name"
                onChangeText={(name)=>{
                    this.setState({
                        bookName:name
                    })
                }}
                
                />
                <TextInput
                style={[Styles.formTextInput,{height:300}]}
                multiline={true}
                numberOfLines={8}
                value={this.state.reasonToRequest}
                placeholder="Please mention the reason for requesting the book"
                onChangeText={(Request)=>{
                    this.setState({
                        reasonToRequest:Request
                    })
                }}
                
                />
                <TouchableOpacity
                 style={Styles.button}
                 onPress={()=>{
                     this.addRequest(this.state.bookName,this.state.reasonToRequest)
                 }}
                >
                 <Text>Request</Text>  
                </TouchableOpacity>
                </KeyboardAvoidingView>

            </View>
        )
    }
}
const Styles=StyleSheet.create({
    button:{
        width:300,
        height:50,
        jusitfyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgorundColor:'#FF9800',
        shadowColor:'#000',
        shadowOffset:{width:0,height:8},
        shadowOpacity:0.3,
        shadowRadius:10,
        elevation:16
    },
    formTextInput:{
        width:"75%",
        height:55,
        alignSelf:"center",
        borderColor:"black",
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
})

