// src/camera.page.js file
import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import Toolbar from './toolbar.component';

import styles from './styles';

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        cameraType: null,
        hasCameraPermission: null,
    };

    setCameraType = (cameraType) => this.setState({ cameraType });



    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };
    state = {bool: false}

    _switch = () => 
        this.setState({
            bool: true
        })
    

    render() {
        const { hasCameraPermission, cameraType } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
            <View style = {styles.button}>
                {this.state.bool 
                ? <Camera 
                    style={styles.preview} 
                    type={cameraType}
                    ref={camera => this.camera = camera}>
                    <TouchableOpacity style={styles.backbutton}
                        onPress={ () => this.setState({
                            bool: false
                        })
                        }>
                        <Ionicons
                            name="md-arrow-back"
                            color="white"
                            size={30}
                        />
                    </TouchableOpacity>
                    <Toolbar 
                    cameraType={cameraType}
                    setCameraType={this.setCameraType}
                />
                </Camera>
                : <Button onPress={() => this._switch()} title="camera"/>}
            </View> 

            </React.Fragment>
        );
    };
};
