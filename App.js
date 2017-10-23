
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';
import Login from './src/routes/Login';
import Signup from './src/routes/Signup';
import Profile from './src/routes/profile';
import Mape from './src/routes/map';
// export default class App () => {
//     this.state={component:'Signup'};
//     render(){
//         if(this.state.component="Signup")
//             return(
//                     <Signup/>
//                 )
//     }
// }
export default class App extends React.Component {

  constructor(props) {
      super(props);

      this.result;
      // fetch("http://169.254.30.133:8000/user")
      // .then((response)=>{
      //   this.result=response
      //   //Alert.alert(response)
      // });
      this.state = { component: 'Signup' };
  }
  changestate(com) {
      this.setState({ component: com });

  }

  render() {
      if (this.state.component == 'Signup') {
          return <Signup changeV={this.changestate.bind(this)} />;
      } else if (this.state.component == 'Login') {
          return <Login changeV={this.changestate.bind(this)} />;
      } else if (this.state.component=='Profile') {
          return <Profile changeV={this.changestate.bind(this)} />;
      } else if(this.state.component == 'Mape') {
          return <Mape changeV={this.changestate.bind(this)} />;
      }
  }
}
