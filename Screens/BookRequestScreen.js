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
            isBookRequestActive:'',
            requestedBookName:'',
            bookStatus:'',
            requestId:'',
            userDocId:'',
            docId:'',
            


    }
}

    createUniqueId=()=>{
        return(
            Math.random().toString(36).substring(7)
        )
    }
    getBookRequest=async()=>{
        db.collection("request").where("Username","==",this.state.userId).get().then((snapshot)=>{
            snapshot.forEach((document)=>{
                if(document.data().BookStatus!=="recieved"){
                    this.setState({
                        requestId:document.data().RequestID,
                        requestedBookName:document.data().Bookname,
                        reasonToRequest:document.data().Reasonforrequest,
                        bookStatus:document.data().BookStatus,
                        docId:document.id,


                    })
                }
                
            })
        })
    }
    addRequest=async(bookName,reasonRequest)=>{
        var userID=this.state.userId 
        var randomRequestId=this.createUniqueId()
        var reason=reasonRequest
        var book=bookName
        db.collection("request").add({
            "Username":userID,
            "Bookname":book,
            "Reasonforrequest":reason,
            "RequestID":randomRequestId,
            "BookStatus":"request",
            "Date":firebase.firestore.Timestamp.now().toDate().toString()
            
        })
        await this.getBookRequest()
        db.collection('users').where("emailId","==",this.state.userId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection("users").doc(doc.id).update({
                    isBookRequestActive:true
                })
            })
        })
        this.setState({
            Bookname:'',
            reasonToRequest:'',
            requestId:randomRequestId,
        })
        Alert.alert("Book requested successfully")
        
    }
    getIsBookRequestActive=()=>{
        db.collection("users").where("eamilId","==",this.state.userId).onSnapshot((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    isBookRequestActive:doc.data().isBookRequestActive,
                    userDocId:doc.id,
                })
            })
        })
    }
    updateBookRequestStatus=()=>{
      db.collection("request").doc(this.state.docId).update({
          "BookStatus":"recieved"
      })  
      db.collection('users').where("emailId","==",this.state.userId).get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
            db.collection("users").doc(doc.id).update({
                isBookRequestActive:false
            })
        })
    })
    }
    recievedBooks=(bookName)=>{
        db.collection("RecivedBooks").add({
            "UserId":this.state.userId,
            "BookName":bookName,
            "RequestId":this.state.requestId,
            "BookStatus":"recieved",

        })
    }
    sendNotifications=()=>{
        db.collection("users").where("emailId","==",this.state.userId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var Name=doc.data().firstName
                var LastName=doc.data().lastName
                db.collection("AllNotifications").where("RequestId","==",this.state.requestId).get().then((snapshot)=>{
                    var DonorId=doc.data().donorId
                    var Bookname=doc.data().Bookname
                    var Message=Name +"recieved the book"
                    
                    db.collection("AllNotifications").add({
                        "targetUserId":DonorId,
                        "Bookname":Bookname,
                        "Status":"unread",
                        "Message":Message
                    })
                })

            })
        })
    }
    
    componentDidMount(){
this.getBookRequest()
this.getIsBookRequestActive()
    }

    render(){
if(this.state.isBookRequestActive===true){
    return(
        <View style={{flex:1}}>
            <View>
                <Text>
                    Book Name:{this.state.requestedBookName}
                </Text>
            </View>
            <View>
                <Text>
                    Book Status:{this.state.requestedBookStatus}
                </Text>
            </View>
            <TouchableOpacity onPress={()=>{
                this.sendNotifications()
                this.updateBookRequestStatus()
                this.recievedBooks(this.state.requestedBookName)
                
            }}>
                 <Text> I have recieved the book!</Text>
            </TouchableOpacity>
        </View>
    )
    
}
        
else{        
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

