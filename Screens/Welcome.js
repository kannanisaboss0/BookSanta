import *as React from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Modal,ScrollView,KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'

export default class Welcome extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:'',
            isModalVisible:false
        }
    }
    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
            return(
                this.props.navigation.navigate("BottomTab")

            )
        })
        .catch((error)=>{
            var  errorCode= error.code
            var ErrMessage=error.ErrMessage
            return(
                Alert.alert(ErrMessage)
            )

        })
            
        
    }
    userSignUp=(emailId,password,confirmedPassword)=>{
        if(password!==confirmedPassword){
            Alert.alert("Password does not match")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        .then(()=>{
            db.collection("users").add({
                "firstName":this.state.firstName,
                "lastName":this.state.lastName,
                "contact":this.state.contact,
                "emailId":this.state.emailId,
                "address":this.state.address
            })
            return(
                
                Alert.alert("User Added Successfully","",[{
                    text:"OK",
                    onPress:()=>{
                        this.setState({
                            isModalVisible:false
                        })
                    }
                }])
                
            )
        })
        .catch((error)=>{
            var  errorCode= error.code
            var ErrMessage=error.ErrMessage
            return(
                Alert.alert(ErrMessage)
            )

        })
            
    }  
    }
    showModal=()=>{
        if(this.state.isModalVisible===true){

        
        return(
            <Modal
            
            animationType="fade"
            transparent={true} 
            visible={this.state.isModalVisible}
            
            >
                <View style={Styles.modalContainer}>
                <ScrollView style={{width:"100%"}}>
            <KeyboardAvoidingView style={Styles.keyboardAvoidingView}>
            <Text style={Styles.modalTitle}>Don't have an account yet?</Text>
            <Text style={Styles.modalTitle}>Sign Up Now!</Text>
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
            <TextInput
            value={this.state.emailId}
            placeholder="Email Address"
            keyboardType={"email-address"}
            style={Styles.formTextInput}
            onChangeText={(x)=>{
                this.setState({
                    emailId:x
                })
            }}
            />
            <TextInput
            value={this.state.password}
            placeholder="Password"
           
            secureTextEntry={true}
            style={Styles.formTextInput}
            onChangeText={(x)=>{
                this.setState({
                    password:x
                })
            }}
            />
            <TextInput
            value={this.state.confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={true}
            style={Styles.formTextInput}
            onChangeText={(x)=>{
                this.setState({
                    confirmPassword:x
                })
            }}
            />
            <View style={Styles.modalBackButton}>
                <TouchableOpacity onPress={()=>{
                    this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                }} style={Styles.registeredButton}>
                <Text style={Styles.registerButtonText}>Register</Text>

                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity  onPress={()=>{
                    this.setState({
                        isModalVisible:false
                    })
                }}style={Styles.cancelButton}>
                    <Text style={{color:"#FF5722"}}>Cancel</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
                </ScrollView>

                </View>


            </Modal>
        )
    }
}
    render(){
        return(
            
            <View style={Styles.container}>
                {this.showModal()}
                <View style={Styles.profile}>
            <Text style={Styles.title}>Book Santa</Text>
                </View>
                <View style={Styles.buttonContainer}>
                    <TextInput
                    style={Styles.loginStyle}
                    value={this.state.emailId}
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }
                }
                    keyboardType={"email-address"}
                    placeholder="abc@example.com"
                    placeholderTextColor="white"

                    />
                    <TextInput
                    style={Styles.loginStyle}
                    value={this.state.password}
                    onChangeText={(password)=>{
                        this.setState({
                            password:password
                        })
                    }}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="white"
                    />
                    <TouchableOpacity onPress={()=>{this.userLogin(this.state.emailId,this.state.password)}} style={[Styles.button,{marginBottom:20,marginTop:20}]}>
                    <Text style={Styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            isModalVisible:true
                    })
                    
                    }} style={Styles.button}>
                    <Text style={Styles.buttonText}>Sign up</Text>
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