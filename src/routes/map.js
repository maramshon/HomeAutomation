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
export default class Mape extends React.Component {
    constructor(props) {
        super(props)
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
                </Text>
                
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
