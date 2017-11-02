import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, FlatList, StyleSheet, } from 'react-native';
import SocketIOClient from 'socket.io-client';
// import SocketIOClient from 'https://code.jquery.com/jquery-1.11.1.js'
import { Icon} from 'react-native-elements'; 

export default class ChatBox extends React.Component {
  static navigationOptions={
    header: null,    
   tabBarLabel:'ChatBox',
    tabBarIcon:()=> {
      return <Icon name="chat" size={25} color={"white"}/>
    }
  }

 constructor(props){
    super(props)

   this.state={
      // arr:[{user:this.state.user, text:'please work', date:'for ever'}],
      arr:[{user:'user', text:'please work', date:"new Date"}],

     msg:''
    }

   this.socket = SocketIOClient('http://192.168.2.46:8000');
    this.socket.on('allDataBase',(data)=> {
      this.showArr(data);
    })

   this.socket.on('msg', (data)=> {
      this.showArr(data);
    })

 }

 showArr(data){
    data = data.reverse();
        this.setState((pre)=> {
            return {
                arr:data
            }
        })
    }

 changeMsg(data){
    this.setState({
      msg: data
    })
  }
  
 send(data){
    this.socket.emit('message', {user: 'user1', text: data, date:(new Date).toString()})
    this.setState({msg:''})
  }

 render(){
    return(
      <View>
        <Text>{this.state.msg}</Text>
        <Text></Text>
        <Text>Hello in chat page</Text>
        <TextInput
            placeholder = "Type here ..."
            onChangeText =  {(text) => this.changeMsg(text)}
            value = {this.state.msg}
        />
        <TouchableOpacity
            onPress={()=>{
              this.send(this.state.msg)
            }
            }
            >
            <Text>Send</Text>
        </TouchableOpacity>
        <FlatList
            data={this.state.arr}
            renderItem={({item}) =>
                <Text style={styles.item}>
                    {item.user + ': '+item.text +'; '+ item.date}
                </Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})