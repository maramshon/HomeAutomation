import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Button,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    async Login() {
        try {
            let response = await fetch('https://home99.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: this.state.username,
                        password: this.state.password
                    }
                })
            });

            let res = await response.text();
            console.log(res);
            res = JSON.parse(res);
            if (res == 'done') {
                return this.props.changeV('Home');
                console.log('exist');
            } else {
                Alert.alert('username or password incorrect');
            }
        } catch (errors) {
            console.log('catch errors' + errors);
        }
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
                    Welcome to the Home Automation System
                </Text>

                <View style={styles.container}>
                    <TextInput
                        placeholder="username"
                        returnKeyType="next"
                        validators="required"
                        onChangeText={value =>
                            this.setState({ username: value })}
                        placeholderTextColor="#800080"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="password"
                        secureTextEntry={true}
                        validators="required"
                        returnKeyType="go"
                        onChangeText={value =>
                            this.setState({ password: value })}
                        placeholderTextColor="#800080"
                        style={styles.input}
                    />
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => this.Login()}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>

                    <Button
                        title="Go to Signup"
                        onPress={() => this.props.changeV('Signup')}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {},
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
    },
    input: {
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#E0FFFF',
        color: '#C71585',
        paddingHorizontal: 10,
        width: 200,
        textAlign: 'center'
    },
    buttonContainer: {
        backgroundColor: '#C71585',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '700'
    }
});
