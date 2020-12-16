import React from 'react'
import {View,Text,TouchableOpacity,FlatList,StyleSheet} from 'react-native'
import db from '../config.js'
import firebase from 'firebase'
import MyHeader from '../Components/MyHeader.js'
import {ListItem,Card,Icon} from 'react-native-elements'
 export default class MyDonationScreen extends React.Component{
     constructor(){
         super();
         this.state={
             donorId:firebase.auth().currentUser.email,
             donorName:'',
             allDonations:[],
         }
         this.requestRef=null
     }
     static navigationOptions={header:null}

    getDonorDetails=(donorId)=>{
        db.collection("users").where("emailId","==",donorId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data=doc.data();
                this.setState({
                    donorName:data.firstName+'    '+data.lastName
                })
            })
        })
    }
    getAllDonations=()=>{
        this.requestRef=db.collection("AllDonations").where("donorId","==",this.state.donorId).onSnapshot((snapshot)=>{
            var AllDonations=[]
            snapshot.docs.map((doc)=>{
                var Donation=doc.data();
                Donation["docId"]=doc.id
                AllDonations.push(Donation)
            
            })
            this.setState({
                allDonations:AllDonations
            })
        })
    }
    sendNotification=(bookDetails,requestStatus)=>{
        var RequestId=bookDetails.RequestId
        var DonorId=bookDetails.donorId
        db.collection("AllNotifications").where("RequestId","==",RequestId).where("donorId","==",donorId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var Message=""
                if(requestStatus==="Book Sent"){
                    Message=this.state.donorName+" "+"sent you book"
                }
                else{
                    Message=this.state.donorName+" has shown interest in donating the book"
                }
                db.collection("AllNotifications").doc(doc.id).update({
                    "Message":Message,
                    "Status":"unread",
                    "Date":firebase.firestore.Timestamp.now().toDate()

                })
            })
        })
    }
    sendBook=(bookDetails)=>{
        if(bookDetails.requestStatus==="Book Sent"){
            var RequestStatus="Donor Intrested"
            db.collection("AllDonations").doc(bookDetails.docId).update({
                "requestStatus":"Donor Interested "
            })
            this.sendNotification(bookDetails,RequestStatus)
        }
        else{
            var RequestStatus="Book Sent"
            db.collection("AllDonations").doc(bookDetails.docId).update({
                "requestStatus":"Book Sent "
            })
            this.sendNotification(bookDetails,RequestStatus) 
        }
    }
    keyExtractor=(item,index)=>{
        index.toString()
    }
    renderItem=({item,index})=>{
        return(
            <ListItem
            key={index}
            title={item.Bookname}
            subTitle={"Reqeusted By"+item.requestedBy +"Status:"+item.requestStatus}
            leftElement={<Icon color="#696969" name="book" type="font-awsome"/>}
            titleStyle={{color:"black",fontWeight:"bold"}}
            rightElement={<TouchableOpacity  onPress={()=>{
                this.sendBook(item)
            }} style={[Styles.button,{backgroundColor:item.requestStatus==="Book Sent"?"green":"orange"}]}><Text style={Styles.buttonText}>
               {item.requestStatus==="Book Sent"?"Book Sent":"Send Book"} </Text></TouchableOpacity>}
               bottomDivider
            />
        )
    }
    componentDidMount(){
        this.getAllDonations()
        this.getDonorDetails(this.state.donorId)

    }
    componentWillMount(){
        this.requestRef()
    }
     render(){

         return(
             <View style={{flex:1}}>
                 <MyHeader title="My Donations" navigation={this.props.navigation}/>
                 <View style={{flex:1}}>
                    {this.state.allDonations.length===0?
                    (
                        <View style={{flex:1,alignItems:"cneter",jusitfyContent:"center"}}>
                            <Text style={{fontSize:20}}>No Book Donations to display</Text>
                        </View>
                    ):
                    (<FlatList
                    keyExtractor={
                        this.keyExtractor()
                    }
                    data={this.state.allDonations}
                    renderItem={
                        this.renderItem()
                    }
                    >
                        
                    </FlatList>)
                }
                 </View>
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
    buttonText:{
        color:"white",
        fontWeight:200,
        fontSize:20,

    },
 })