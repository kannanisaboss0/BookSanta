import React,{Component} from 'react'
import {Header,Icon,Badge} from 'react-native-elements'
import {View,Text,StyleSheet,Alert,FlatList} from 'react-native'
import db from '../config.js'



export default class MyHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            value:'',
            
        }
        this.recNotications=null
    }
    bellIconWithBadge=()=>{
        return(
            <View>
                <Icon
                name="bell"
                type="font-awesome"
                color="#696969"
                onPress={()=>{
                    this.props.navigation.navigate('Notifications')
                }}

                />
                <Badge
                value={this.state.value}
                containerStyle={{position:"absolute",top:-4,right:-4}}
                />
            </View>
        )
    }
    getUnreadNotifications=()=>{
        db.collection('AllNotifications').where("Status","==","unread").onSnapshot((snapshot)=>{
          var UnreadNotifications=snapshot.docs.map((document)=>
            document.data()
          )
          this.setState({
              value:UnreadNotifications.length
          })
        })
    }
    componentDidMount(){
        this.getUnreadNotifications()
    }
    render(){
        return(
            <Header
            backgroundColor="#EAF8fE"
            rightComponent={<this.bellIconWithBadge{...this.props}/>}
            centerComponent={{text:this.props.title,style:{color:'#9085A9',fontSize:20,fontWeight:"bold"}}}
            leftComponent={<Icon
            name="bars"type="font-awesome"
            color="#696969"
            onPress={()=>{
                this.props.navigation.toggleDrawer()
            }}
            />}

            />
        )
    }
    
   
}



