import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image,
    Button,
    Alert

    
} from 'react-native';
import { Icon} from 'react-native-elements'; 
const ImagePicker = require('react-native-image-picker');
import prompt from 'react-native-prompt-android';
export default class Profile extends React.Component {
           static navigationOptions={
        header: null,    
        tabBarLabel:'Profile',
        tabBarIcon:()=> {
            return <Icon name="people" size={25} color={"white"}/>
        }
    }
    constructor(props) {
        super(props);
        this.state={
             init:this.getCureentUser(),
                 name:"",
                 logout : "",
                 image:"a"
         }

    }
    //set new name in database 
    async SetName(){
        try {
            let response = await fetch('https://home99.herokuapp.com/SetName', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        name:this.state.name
                    }
                })
            });

            let res = await response.text();
        } catch (errors) {
            console.log('catch errors' + errors);
        }
    }
    //change username
    ChangeName(){
        prompt(
            'Enter your username',
            '',
            [
             {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
             {text: 'OK', onPress: name => {
                this.setState({
                    name: name
                });
                this.SetName();
             }},
            ],
            {
                type: 'secure-text',
                cancelable: false,
                placeholder: 'UserName'
            }
        );
    }
    //update the new image 
    async SetNewImage() {
        try {
            let response = await fetch('https://home99.herokuapp.com/SetNewImage', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        image:this.state.image,
                        name:this.state.name
                    }
                })
            });

            let res = await response.text();
        } catch (errors) {
            console.log('catch errors' + errors);
        }
    }
    //logout
    async logout() {
            try {
                     let response = await fetch('https://home99.herokuapp.com/logout');
                     let responseJson = await response.json();
                     this.setState({logout:responseJson})
                     return this.props.changeV('Login');
               } catch(error) {
                 console.error(error);
                 }
    } 

    //fetch user info
    async getCureentUser() {
        try {
                 let response = await fetch('https://home99.herokuapp.com/user');
                 let responseJson = await response.json();
                 this.setState({image:responseJson.image})
                 this.setState({name:responseJson.name})
           } catch(error) {
             console.error(error);
             }
    } 
    ChangePicture(){
             var options = {
              title: 'Select profile image',
              customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
              ],
              storageOptions: {
                skipBackup: true,
                path: 'images'
              }
        };

      ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: source.uri
        });
        //update the image in database
        this.SetNewImage();
       }
       });
    }
    
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('./Smart.png')}
                    />
                    </View>
                     <Text style={styles.header}>
                    {' '}
                    {this.state.name}
                        </Text>

                <Button
                        title="Change username"
                        onPress={() => this.ChangeName()}
                />
                <Button
                        title="Change profile picture"
                        onPress={() => this.ChangePicture()}
                />
                <View>
                <Image source={{uri: this.state.image}} style={{width: 60, height: 60}} />
                </View>

                 <View style={styles.buttonContainer} >
                            
                <TouchableOpacity
                style={styles.buttonContainer}
                    onPress={() => this.logout()}>
                    <Text style={styles.buttonText}>Log out</Text>
                    </TouchableOpacity> 

                </View>

                </KeyboardAvoidingView>

            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    logo: {
        width: 200,
        height: 200
    },
    header: {
        color: '#fff',
        marginTop: 5,
        textAlign: 'center',
        opacity: 0.8,
        fontWeight: '700'
    }
});


