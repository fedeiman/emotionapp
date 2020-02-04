// src/toolbar.component.js file
import React from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';


const { Type: CameraTypes } = Camera.Constants;

export default ({ 
    cameraType = CameraTypes.back,  
    setCameraType, 
}) => (
        <TouchableOpacity
            onPress={() => setCameraType(
                cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back
            )}>
            <Ionicons
                name="md-reverse-camera"
                color="black"
                size={30}/>
        </TouchableOpacity>
);