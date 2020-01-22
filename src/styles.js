// src/styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    preview: {
        flex: 1, 
    },
    button: {
        flex:1,
        justifyContent:'center',
      },
    backbutton:{
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    fontype: {
        fontSize: 15, 
        marginBottom: 10, 
        color: 'white' 
    },
    cameraView: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    }
});