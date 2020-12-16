import React from 'react'
import {TextInput,TouchableOpacity,Text,View,StyleSheet} from 'react-native'

import {Card,Header,Icon} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config.js'
 export default class RecieverDetails extends React.Component{
     constructor(props){
         super(props);
         this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam('Details')["Username"],
            requestId:this.props.navigation.getParam('Details')["RequestID"],
            ReasonforRequest:this.props.navigation.getParam('Details')["Reasonforrequest"],
            bookName:this.props.navigation.getParam('Details')["Bookname"],
            recieverName:'',
            recieverContact:'',
            recieverAddress:'',
            recieverRequestDocID:'',
            userName:''
            

         }
     }
     getUserDetails=(userId)=>{
        db.collection("users").where("emailId","==",userId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data=doc.data();
                this.setState({
                    userName:data.firstName+'    '+data.lastName
                })
            })
        })
    }
     getRecieverDetails=()=>{
         db.collection("users").where("Username","==",this.state.recieverId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    recieverName:doc.data().firstName,
                    recieverContact:doc.data().contact,
                    recieverAddress:doc.data().address,

                })

            })
         })
         db.collection("request").where("RequestId","==",this.state.requestId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    recieverRequestDocID:doc.id
                })
            })
         })
     }
     updateBookStatus=()=>{
         db.collection("AllDonations").add({
             "bookName":this.state.bookName,
             "requestId":this.state.requestId,
             "requestedBy":this.state.recieverName,
             "donorId":this.state.userId,
             "requestStatus":"Donor Interseted"
         })
     }
     addNotification=()=>{
         var Message=this.state.userName+"  has hsown interest in donating:)"
         db.collection("AllNotifications").add({
            "targetUserId":this.state.recieverId,
            "donorId":this.state.userId,
            "requestId":this.state.requestId,
            "Bookname":this.state.bookName,
            "Date":firebase.firestore.Timestamp.now().toDate(),
            "Status":"unread",
            "Message":Message

         })
     }
    componentDidMount(){
        this.getRecieverDetails()
        this.getUserDetails(this.state.userId)
    }

     render(){
         return(
             <View style={{flex:0.1}}>
                 <View style={{flex:0.1}}>
                     <Header
                     backgroundColor="#eaf8fe"
                     centerComponent={
                         {text:"Donate Books",style:{color:"#908589",fontSize:20,fontWeight:"bold"},}
                     }
                     leftComponent={<Icon  onPress={()=>{
                         this.props.navigation.goBack();
                     }}   color="#696969" type={"feather"} name="arrow-left"></Icon>}
                     />
                 </View>
                 <View style={{flex:0.3}}>
                     <Card
                     title="Book Information"
                     titleStyle={{fontSize:20}}

                     >
                         <Card>
                    <Text style={{fontWeight:"bold"}}>Name:{this.state.bookName}</Text>
                    <Card>
                        <Text style={{fontWeight:"bold"}}>Reason:{this.state.ReasonforRequest}</Text>
                    </Card>
                         </Card>
                         
                     </Card>
                 </View>
                 <View style={{flex:0.3}}>
                     <Card 
                     title="Reciever Information"
                     titleStyle={{fontSize:20}}>
                         <Card>
                             <Text style={{fontWeight:"bold"}}>Name:{this.state.recieverName}</Text>
                             
                         </Card>
                         <Card>
                             <Text style={{fontWeight:"bold"}}>Address:{this.state.recieverAddress}</Text>
                         </Card>
                         <Card>
                             <Text style={{fontWeight:"bold"}}>Contact:{this.state.contact}</Text>
                         </Card>

                     </Card>
                 </View>
                 <View style={Styles.buttonContainer}>
                     {
                         this.state.recieverId!==this.state.userId?(
                             <TouchableOpacity style={Styles.button} onPress={()=>{
                                 this.updateBookStatus()
                                 this.props.navigation.navigate('MyDonations')
                                 this.addNotification()
                             }}>
                                 <Text>I want to donate!</Text>
                             </TouchableOpacity>
                         ):
                         <Card title="User Alert">
                             <Text>You cannot donate books to yourself!</Text>
                             <TouchableOpacity onPrees={()=>{this.props.naivgation.navigate('BookDonateList')}}><Text>Go back to Main Menu</Text></TouchableOpacity>
                         </Card>
                     }
                 </View>
                 <Card></Card>
             </View>
         )
     }
 }
 /*"Username":userID,
            "Bookname":book,
            "Reasonforrequest":reason,
            "RequestID":randomRequestId*/

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
    buttonContainer:{
        flex:0.3,
        justifyContent:"center",
        alignItems:"center"
    }
})