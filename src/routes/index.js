import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import Login from './Login';
import Signup from './Signup';

export default () => (
    <Router>
        <Scene Key="root">
            <Scene
                Key="login"
                component={Login}
                title="Login"
                hideNavBar
            />
            <Scene
                Key="signup"
                component={Signup}
                initial={true}
                title="Signup"
                hideNavBar
            />
        </Scene>
    </Router>
);
