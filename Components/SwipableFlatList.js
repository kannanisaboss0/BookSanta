import React,{Component} from 'react'
import {Header,Icon,Badge,ListItem} from 'react-native-elements'
import {View,Text,StyleSheet,Alert,FlatList,Dimensions,Animated} from 'react-native'
import db from '../config.js'
import {SwipeListView } from 'react-native-swipe-list-view'

export default class SwipableFlatList extends Component{
constructor(props){
    super(props);
    this.state={
        AllNotifications:this.props.AllNotifications
    }
}
updateMarksRead=(notifaction)=>{
db.collection('AllNotifcations').doc(notification.docId).update({
    "Status":"read"
})
}
onSwipeValueChange=(swipeData)=>{
var AllNotifcations=this.state.AllNotifications
const {Key,Value}=swipeData
if(Value<=-Dimensions.get("window").width){
    const newData=[...AllNotitifications]
    const Index=AllNotifications.findIndex(item=>item.key===Key)
    this.updateMarksRead(AllNotifcations[Index])
    newData.splice(index,1)
    this.setState({
        AllNotifications:newData
    })
}
}
renderHiddenItem=()=>
    (
    <View style={{alignItem:"center",backgroundColor:"#2d3b7a",flex:1,flexDirection:"row",justifyContent:"space-between",paddingLeft:15}}>
<View style={{alignItems:"center",position:"absolute",top:0,bottom:0,justifyContent:"center",backgroundColor:"#5555ff",width:100,right:0}}>
<Text style={{color:"white",fontWeight:"bold",fontSize:15}}>

</Text>
</View>
    </View>
    )

renderItem=(data)=>{
return(
    <Animated.View>
       <ListItem
       leftElement={<Icon name="book" type="font-awsome" color="#1e4e5f"/>}
       title={data.item.Bookname}
       titleStyle={{color:"black",fontWeight:"bold"}}
       subtitle={data.item.Message}
       bottomDivider
       
       />
    </Animated.View>
)
}
render(){
    return(
        <View style={{backgroundColor:"white",flex:1,}}>
            <SwipeListView disableRightSwipe={true} data={this.state.AllNotifications} renderItem={this.renderItem} renderHiddenItem={this.renderHiddenItem} previewRowKey={0} previewOpenValue={-40} rightOpenValue={-Dimensions.get("window").width} previewOpenDelay={3000} onSwipeValueChange={this.onSwipeValueChange}>
                
            </SwipeListView>
        </View>
    )
}
}