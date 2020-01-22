// src/camera.page.js file
import React from 'react';
import { Camera } from 'expo-camera';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';

import styles from './styles';

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        hasCameraPermission: null,
    };
    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };
    state = {bool: false}

    _switch = () => {
        this.setState({
            bool: true
        })
    }
    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <View style = {styles.button}>
                {this.state.bool 
                ? <Camera 
                    style={styles.preview} 
                    type={Camera.Constants.Type.front} 
                    ref={camera => this.camera = camera}>
                    <View style={styles.cameraView}>
                        <TouchableOpacity
                        style={styles.backbutton}
                        onPress={() => {
                            this.setState({
                                bool: false
                            })
                        }}>
                        <Text style={styles.fontype}> Back </Text>
                        </TouchableOpacity>
                    </View>
                </Camera> 
                : <Button onPress={this._switch} title="camera"/>}
            </View> 
        );
    };
};
