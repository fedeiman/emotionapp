// src/styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const landmarkSize = 2;

export default StyleSheet.create({
    preview: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    button2:{
      flexDirection: 'row',
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
      },
      landmark: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
      },
      faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
      },
      row: {
        flexDirection: 'row',
      },
      face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        justifyContent:'flex-end',
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
    cambutton: {
      flex: 0.5,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
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