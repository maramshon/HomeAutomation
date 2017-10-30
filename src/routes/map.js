import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Icon} from 'react-native-elements'; 

const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_PATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGTITUDE_DELTA = LATITUDE_DELTA * ASPECT_PATIO;
export default class Map extends React.Component {
    static navigationOptions = {
        header: null,     
        tabBarLabel: 'Map',
        tabBarIcon:()=> {
            return <Icon  name="location-on" size={25} color={"white"}/>
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            }
        };
    }
    watchID: ?number = null;
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                var lat = parseFloat(position.coords.latitude);
                var long = parseFloat(position.coords.longitude);

                var initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGTITUDE_DELTA
                };
                this.setState({ initialPosition: initialRegion });
                this.setState({ markerPosition: initialRegion });
            },
            error => alert(JSON.stringify(new Date(), error)),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 }
        );
        this.watchID = navigator.geolocation.watchPosition(position => {
            var lat = parseFloat(position.coords.latitude);
            var long = parseFloat(position.coords.longitude);
            var lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGTITUDE_DELTA
            };
            this.setState({ initialPosition: lastRegion });
            this.setState({ markerPosition: lastRegion });
        });
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    // onPress={(m) => this.setState({ x: m.nativeEvent.coordinate.latitude ,y: m.nativeEvent.coordinate.longitude }) Alert.alert(x,y)}
                    region={this.state.initialPosition}
                >
                    <MapView.Marker coordinate={this.state.markerPosition}>
                        <View style={styles.radius}>
                            <View style={styles.marker} />
                        </View>
                    </MapView.Marker>
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        justifyContent: 'center',
        alignItems: 'center'
    },

    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 112, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        borderColor: 'white',
        borderWidth: 3,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    }
});
