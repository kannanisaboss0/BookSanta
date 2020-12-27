import *as React from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Modal,ScrollView,KeyboardAvoidingView,FlatList,} from 'react-native'
import {ListItem} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../Components/Myheader.js'

export default class MyRecievedBooksListScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allRecievedBooks:[],
        }
        this.requestRef=null
    }
    getRecievedBooksList= ()=>{
        this.requestRef=db.collection('RecievedBooks').where("UserId","==",this.state.userId).where("BookStatus","==","recieved").onSnapshot((snapshot)=>{
            var recievedBooksList=snapshot.docs.map(document=>
               document.data()
            
           

            )
            this.setState({
                allRecievedBooks:recievedBooksList
             })
        })
    }

     componentDidMount(){
       this.getRecievedBooksList()    
     
    }
    componentWillUnmount(){
        this.requestRef()
    }
    renderItem=({item,i})=>{
        return(
            <ListItem
            key={i}
            title={item.BookName}
            subTitle={item.BookStatus}
            titleStyle={{color:"black",fontWeight:"bold"}}
            bottomDivider
        
            />
        )

    }
    render(){
        
        
        return(
            <View style={{flex:1}}>
            <MyHeader title="Recieved Books" navigation={...this.props.navigation}/>    
        <View >{
            this.state.allRecievedBooks.length===0?
                (
                        <View style={{flex:1,justifyContent:"center",alignItems:"center",fontSize:20}}>
                            <Text style={{fontSize:22}}>No Recieved Books</Text>
                        </View>
                    
                ):
                (
                    <FlatList data={this.state.allRecievedBooks} renderItem={
                        this.renderItem
                    }
                    keyExtractor={(item,index)=>
                     index.toString()
                    }
                    >
     
                    </FlatList>
                )
        }</View>
              
            
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