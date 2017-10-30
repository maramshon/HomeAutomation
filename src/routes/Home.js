import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Profile from './Profile';
import ChatBox from './ChatBox';
import Main from './Main';
import Controle from './Controle';
import Map from './map';

var MainScreenNavigator = TabNavigator({
    Profile: { screen: Profile },
    GoogleMap: { screen: Map },
    Controle: { screen: Controle },
    ChatBox: { screen: ChatBox },
    //Main: {screen: Main}
},{
    tabBarPosition:'top',
    swipeEnabled:true,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
        header: null,    
        upperCaseLabel: false,
        showIcon: true,
        style: {
         
            backgroundColor: '#b30047'
          },
          indicatorStyle: {
            backgroundColor: 'white'
          },
          labelStyle: {
            fontSize: 14,
            color: 'white',
            fontFamily: 'impact'
          },

    }
}
);
MainScreenNavigator.navigationOptions = {
    title: 'please work'
};
export default MainScreenNavigator;
