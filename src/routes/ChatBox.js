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
      arr:[{user:'maram', text:'please work', date:'for ever'}],
      msg:'========'
    }
    this.socket = SocketIOClient('http://192.168.8.119:8000');

    this.socket.on('allDataBase',(data)=> {
      this.showArr(data); 
    })

    this.socket.on('msg', (data)=> {
      this.showArr(data);
    })

  }

  // function showArr(data);
  showArr(data){
    if(typeof data === 'object'){
      // for(var i=0; i<data.length; i++){
      //   this.setState((pre) => {
      //     return {
      //       arr: pre.arr.concat(
      //         {
      //           user: data[i].user,
      //           text: data[i].text,
      //           date: data[i].date
      //         }
      //       )
      //     }
      //   }) 
      // }
      this.setState((pre)=> {
        return {
          arr:data
        }
      })
    }
    else{
      this.setState((pre) => {
        // return {
          // arr: pre.arr.concat(
          //   {
          //     user: data.user,
          //     text: data.text,
          //     date: data.date
          //   }
          // )
          arr: pre.arr.concat(data)
        // }
      }) 
    }
  }
 
  changeMsg(data){ 
    this.setState({
      msg: data
    }) 
  }
  
  send(data){
    this.socket.emit('message', {user: 'user1', text: data, date:'2017/11'})
  }

  render(){
    return(
      <View>
        <Text>{this.state.msg}</Text>
        <Text>Hello in chat page</Text>
        <TextInput
            placeholder = "Type here ..."
            onChangeText =  {(text) => this.changeMsg(text)} //{(text) => {this.setState({msg:text})}}  
            value = {this.state.msg}
        />
        <TouchableOpacity
            onPress={()=>{
              this.send(this.state.msg)   // function send and add to it the msg which is from TextInput
            }
            }
            >
            <Text>Send</Text>
        </TouchableOpacity>
        <FlatList
            data={this.state.arr}
            renderItem={({item}) => <Text style={styles.item}>{item.user + ': '+item.text}</Text>}
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

























































// import React from 'react';
// import { View, Text, TouchableOpacity, TextInput, Alert, FlatList, StyleSheet, } from 'react-native';
// import SocketIOClient from 'socket.io-client';
// import SocketIOClient from 'https://code.jquery.com/jquery-1.11.1.js'
// import { Icon} from 'react-native-elements'; 

// export default class ChatBox extends React.Component {
//  static navigationOptions={
//    header: null,    
//    tabBarLabel:'ChatBox',
//    tabBarIcon:()=> {
//      return <Icon name="chat" size={25} color={"white"}/>
//    }
//  }

//  constructor(props){
//    super(props);
//    this.state={
//      msg:'',
//      arr:[],
//      tag:{}
//    }

//    //this.send=this.send.bind(this);

//    this.socket = SocketIOClient('http://192.168.8.119:8000');
//    // this.socket.on('firstTime', (data) => {
//    //   {this.setState({arr:data})}
//    // })
//    this.socket.on('msg', (data) => {
//      console.log(data);
//      {this.setState({tag:data})}
//      this.insertTag(this.state.tag)
//      // Alert.alert(data)
//      // this.setState({data:data})
//    });
//  }

//  send(msg){
//    console.log({user: "user", text: msg, date: new Date()})
//    this.socket.emit('message', {user: "user", text: msg, date: "new Date()"});
//  }

//  insertTag = (tag) =>{
//        this.setState({
//            arr: this.state.arr.concat(tag)
//        })
//  }

//  // onPress = {() => {this.insertTag(tag) }}

//  render(){
//    var user = "Frist Client"
//    return (
//      <View>
//        <Text>{user}</Text>
//        <Text>Hello in chat page</Text>
//        <TextInput
//            placeholder="Type here ..."
//            onChangeText={(text) => {this.setState({msg:text})}}  
//            value={this.state.msg}/>
//        <TouchableOpacity
//            onPress={this.send(this.state.msg)}>
//            <Text>Send</Text>
//        </TouchableOpacity>
//        <FlatList
//          data={this.state.arr}
//          renderItem={({item}) => <Text style={styles.item}>{item.user + ': '+item.text}</Text>}
//        />
//      </View>
//    )
//  }
// }

// const styles = StyleSheet.create({
//  container: {
//   flex: 1,
//   paddingTop: 22
//  },
//  item: {
//    padding: 10,
//    fontSize: 18,
//    height: 44,
//  },
// })





// import React from 'react';
// import { View, Text, TouchableOpacity, TextInput,Alert } from 'react-native';
// import SocketIOClient from 'socket.io-client';
// // import SocketIOClient from 'https://code.jquery.com/jquery-1.11.1.js'
// import { Icon} from 'react-native-elements'; 

// // export default class App extends React.Component {
// export default class ChatBox extends React.Component {
//           static navigationOptions={
//        header: null,    
//        tabBarLabel:'ChatBox',
//        tabBarIcon:()=> {
//            return <Icon name="chat" size={25} color={"white"}/>
//        }
//    }
// constructor(props){
//   super(props);
//   this.state={
//     msg:'',
//     x: 'no response until now',
//     data:""
//   }
//   this.send=this.send.bind(this);
//   // this.recieve=this.recieve.bind(this);

//  this.socket = SocketIOClient('http://192.168.8.119:8000');
//  this.socket.on("kamel",(data)=>{
//     console.log("hahahahahahah")
//  })
//   // this.socket.on('message', this.onReceivedMessage);
//   this.socket.on('msg', (data) => {
//     console.log(data);
//     Alert.alert(data)
//    // this.setState({data:data})
//   });
// }

// send(msg){
//   // Alert.alert(msg);
//   this.socket.emit('message', msg);
// }
// // recieve(msg){
// //   console.log(msg)
// // }
// render(){
//   return (
//     <View>
//       <Text>{this.state.x}</Text>
//       <Text>Hello in chat page</Text>
//       <TextInput
//           placeholder="Type here ..."
//           onChangeText={(text) => {this.setState({msg:text})}}  
//          value={this.state.msg}/>
//       <TouchableOpacity
//           onPress={this.send(this.state.msg)}>
//         <Text>Send</Text>
     
//       </TouchableOpacity>
//     </View>
//   )
// }
// }






// import React from 'react';
// import { View, Text, TouchableOpacity, TextInput, Alert, FlatList, StyleSheet, } from 'react-native';
// import SocketIOClient from 'socket.io-client';
// // import SocketIOClient from 'https://code.jquery.com/jquery-1.11.1.js'
// import { Icon} from 'react-native-elements'; 

// // export default class App extends React.Component {
// export default class ChatBox extends React.Component {
//           static navigationOptions={
//        header: null,    
//       tabBarLabel:'ChatBox',
//        tabBarIcon:()=> {
//            return <Icon name="chat" size={25} color={"white"}/>
//        }
//    }
//  constructor(props){
//    super(props);
//    this.state={
//      arr:[],
//      msg: ''
//    }

//  //  this.send=this.send.bind(this);
// //   this.insertTag=this.insertTag.bind(this);

//    this.socket = SocketIOClient('http://192.168.8.119:8000');
//      this.socket.on('allDataBase', (data) => {
//        for(var i=0; i<data.length; i++){
//          // {this.setState((pre)=> {return {arr:this.state.arr.concat({user: data[i].user, text: data[i].text, date: data[i].date})}})}
//           {this.setState((pre)=> {return {arr:pre.arr.concat({user: data[i].user, text: data[i].text, date: data[i].date})}})}
//        }                                  
//      })
//      this.socket.on('msg', (data) => {
//        console.log(data);
//       // this.insertTag(data);
//      });
//  }

//  send(msg){
//    console.log({user: "user", text: msg, date: new Date()})
//    this.socket.emit('message', {user: "user", text: msg, date: 'new Date()'});
//  }

//   // insertTag(msg){
//   //   console.log(msg);
//   //   this.setState({arr:this.state.arr.concat(msg)})
//   // }

//  render(){
//    return (
//      <View>
//        <Text>Hello in chat page</Text>
//        <TextInput
//            placeholder="Type here ..."
//            onChangeText={(text) => {this.setState((pre)=> {return {msg:text}})}}  
//            value={this.state.msg}/>
//        <TouchableOpacity
//            onPress={this.send(this.state.msg)}>
//            <Text>Send</Text>
//        </TouchableOpacity>
//        <FlatList
//          data={this.state.arr}
//          renderItem={({item}) => <Text>{item.user + ': '+item.text}</Text>}
//        />
//      </View>
//    )
//  }
// }



// import React from 'react';
// import { View, Text, TouchableOpacity, TextInput, Alert, FlatList, StyleSheet, } from 'react-native';
// import SocketIOClient from 'socket.io-client';
// // import SocketIOClient from 'https://code.jquery.com/jquery-1.11.1.js'
// import { Icon } from 'react-native-elements'; 

// // export default class App extends React.Component {
// export default class ChatBox extends React.Component {
//    static navigationOptions={
//       header: null,    
//     tabBarLabel:'ChatBox',
//       tabBarIcon:()=> {
//           return <Icon name="chat" size={25} color={"white"}/>
//   }
//   }
// constructor(props){
//   super(props);
//   this.state={
//     arr:[],
//     msg: ''
//   }

//  this.send=this.send.bind(this);
//  //  this.insertTag=this.insertTag.bind(this);

//  this.socket = SocketIOClient('http://192.168.8.119:8000');
//     this.socket.on('allDataBase', (data) => {
//       for(var i=0; i<data.length; i++){
//         // {this.setState((pre)=> {return {arr:this.state.arr.concat({user: data[i].user, text: data[i].text, date: data[i].date})}})}
//          {this.setState((pre)=> {return {
//             arr:pre.arr.concat({user: data[i].user, text: data[i].text, date: data[i].date})
//         }})}
//       }                                  
//    })
//     // this.socket.on('msg', (data) => {
//     //   console.log(data);
//     //  this.insertTag(data);
//     // });
// }

// send(msg){
//   console.log({user: "user", text: msg, date: new Date()})
//   this.socket.emit('message', {user: "user", text: msg, date: 'new Date()'});
// }

// // insertTag(msg){
// //    console.log(msg);
// //    this.setState((pre) => {return {arr:pre.arr.concat(msg)}})
// //  }

// render(){
//   return (
//     <View>
//       <Text>Hello in chat page</Text>
//       <TextInput
//           placeholder="Type here ..."
//           onChangeText={(text) => 
//             // if(text !== ''){
//             {this.setState((pre)=> {return {msg:text}})}}  
//           // }
//          value={this.state.msg}/>
//       <TouchableOpacity
//           onPress={
//             this.send(this.state.msg)
//           }
//           >
//           <Text>Send</Text>
//       </TouchableOpacity>
//       <FlatList
//         data={this.state.arr}
//         renderItem={({item}) => <Text>{item.user + ': '+item.text}</Text>}
//       />
//     </View>
//   )
// }
// }