// src/styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    preview: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    graf: {
        display:'flex',
        flex: 1.5,
        justifyContent: 'space-between',
    },
    bot: {
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent: 'space-around',
    },
    button: {
        flex:1,
        justifyContent:'center',
    },
    backbutton:{
        justifyContent: 'flex-start',
    },
    cameraView: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomToolbar: {
        width: winWidth,
        position: 'absolute',
        height: 100,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
});