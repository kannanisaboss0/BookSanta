import *as React from 'react'
import MyHeader from '../Components/Myheader'
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Modal,ScrollView,KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'

export default class Settings extends React.Component{
    constructor(){
    super();
    this.state={
        emailId:'',
        firstName:'',
        lastName:'',
        address:'',
        contact:'',
        docId:''
    }
    }
    getUserDetails=async()=>{
        var email=firebase.auth().currentUser.email
        db.collection("users").where("emailId","==",email).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data=doc.data();
                this.setState({
                    emailId:data.emailId,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    address:data.address,
                    contact:data.contact,
                    docId:doc.id
                })
            })

        })
    } 
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            "firstName":this.state.firstName,
                "lastName":this.state.lastName,
                "contact":this.state.contact,
                "address":this.state.address
        })
        window.alert("Profile updated successfully")
        Alert.alert("Profile updated successfully")

    }
    componentDidMount(){
        this.getUserDetails()
    }   
    render(){
        return(
            <View style={Styles.profile}>
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <View style={{flex:1,width:"100%",alignItems:"center"}}>
                <TextInput
            value={this.state.firstName}
            placeholder="First Name"
            maxLength={10}
            style={Styles.formTextInput}
            onChangeText={(x)=>{
                this.setState({
                    firstName:x
                })
            }}
            />
            <TextInput
            value={this.state.lastName}
            placeholder="Last Name"
            maxLength={10}
            style={Styles.formTextInput}
            onChangeText={(x)=>{
                this.setState({
                    lastName:x
                })
            }}
            />
            <TextInput
            value={this.state.contact}
            placeholder="Contact Number"
            keyboardType={"number-pad"}
            maxLength={10}
            style={Styles.formTextInput}
            onChangeText={(x)=>{
                this.setState({
                    contact:x
                })
            }}
            />
            <TextInput
            value={this.state.address}
            placeholder="Address"
            multiline={true}
            style={Styles.formTextInput}
            onChangeText={(x)=>{
                this.setState({
                    address:x
                })
            }}
            />
    <TouchableOpacity onPress={()=>{
        this.updateUserDetails()
    }}
        style={Styles.button}>
        <Text style={Styles.buttonText}>Save
        </Text>
        </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const Styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F8BE85',
    },
    profile:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:65,
        fontWeight:"300",
        paddingBottom:30,
        colour:'#FF3D00'
    },
    buttonContainer:{
        flex:1,
        alignItems:'center'
    },
    loginStyle:{
        width:300,
        height:40,
        borderBottomWidth:1.5,
        borderColor:'#FF8A65',
        fontSize:20,
        margin:10,
        padingLeft:10
    },
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
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
        marginRight:30,
        marginLeft:30,
        marginTop:80,
        marginBottom:80

    },
    keyboardAvoidingView:{
        textAlign:"center",
        flex:1,
        justifyContent:"center"
    },
    modalTitle:{
        justifyContent:"center",
        alignSelf:"center",
        fontSize:30,
        color:"#FF5722",
        margin:50,

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
    modalBackButton:{

    },
    registeredButton:{
        width:200,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
        borderRadius:10,
        marginTop:30
    },
    registerButton:{
        color:"#FF5722",
        fontSize:15,
        fontWeight:"bold"
    },
    cancelButton:{
        width:200,
        height:30,
        justifyContent:"center",
        alignItems:"center",
        marginTop:5

    }
})
//#FF5722