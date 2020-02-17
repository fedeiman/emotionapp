// src/camera.page.js file
import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import { View, Text, Button, TouchableOpacity, Dimensions} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import Toolbar from './toolbar.component';
import styles from './styles';
import Fun from './graf';
import { MaterialIcons } from '@expo/vector-icons';

const landmarkSize = 2;

const dat = require('./data.json')

const screenWidth = Dimensions.get("window").width;
const screenheight = Dimensions.get("window").height;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};

edit = () => {
  a = Math.random() * 100
  b = Math.random() * 100
  c = Math.random() * 100
  d = Math.random() * 100

  e = a+b+c+d

  a = (a * 100) / e
  b = (b * 100) / e
  c = (c * 100) / e
  d = (d * 100) / e

  dat.info.push({
    "Happy": a,
    "Sad":b,
    "Neutral": c,
    "Angry": d
  });

}


////////////////////////////////////////////////////////////////////////////////////////////////////////

export default class CameraPage extends React.Component {
  j = 0;
  data = {};
  Start = false;
  counter = {};
  camera = null;
  dataHappy = new Array(6).fill(0);
  dataSad = new Array(6).fill(0);
  dataNeutral = new Array(6).fill(0);
  dataAngry = new Array(6).fill(0);

  state = {
      cameraType: null,
      hasCameraPermission: null,
      bool: false,
      faceDetecting: false,
      faces: [],

  };

  toggleFaceDetection = () => this.setState(
    { faceDetecting: !this.state.faceDetecting });

  onFacesDetected = ({ faces }) => this.setState({ faces });

  onFaceDetectionError = state => console.warn('Faces detection error:', state);


  renderFace({ bounds, rollAngle, yawAngle }) {
    return (
      <View
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}>
        <Text style={styles.faceText}>
          rollAngle: {rollAngle.toFixed(0)}
        </Text>
        <Text style={styles.faceText}>
          yawAngle: {yawAngle.toFixed(0)}
        </Text>
      </View>
    );
  }

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces = () => 
  <View style={styles.facesContainer} pointerEvents="none">
    {this.state.faces.map(this.renderFace)}
  </View>

renderLandmarks = () => 
  <View style={styles.facesContainer} pointerEvents="none">
    {this.state.faces.map(this.renderLandmarksOfFace)}
  </View>
  
  setCameraType = (cameraType) => this.setState({ cameraType });

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
    this.setState({ hasCameraPermission });
    this.datos();
  };

  stop = () => {
    if(!this.Start){
     clearInterval(this.counter);
     //console.log("Stop")
    }
    else{
    this.counter = setInterval(this.timer, 1000);
    }
  }

  timer = () => {
    edit();
    this.datos();
    //console.log("Run...")
  }

  _switch = () => {this.setState({bool: true});
    this.Start = true; 
    this.stop()
  }
  _switch2 = () => {this.setState({bool: false});
    this.Start = false; 
    this.stop()
  }
    
  datos = () => {
    for(let i=0; i < 5; i++){
      this.dataHappy.splice(i, 1, this.dataHappy[i+1])
      this.dataSad.splice(i, 1, this.dataSad[i+1])
      this.dataNeutral.splice(i, 1, this.dataNeutral[i+1])
      this.dataAngry.splice(i, 1, this.dataAngry[i+1])
    }
    if(this.j < (dat.info.length)){
      this.dataHappy.splice(5, 1, dat.info[this.j].Happy)
      this.dataSad.splice(5, 1, dat.info[this.j].Sad)
      this.dataNeutral.splice(5, 1, dat.info[this.j].Neutral)
      this.dataAngry.splice(5, 1, dat.info[this.j].Angry)
      this.j ++
    }
    else{
      this.dataHappy.splice(5, 1, 0)
      this.dataSad.splice(5, 1, 0)
      this.dataNeutral.splice(5, 1, 0)
      this.dataAngry.splice(5, 1, 0)
    }
    this.data = {
      datasets : [
        { 
          data: this.dataHappy, 
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        },
        {
          data:this.dataSad,
          color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`, // optional
          strokeWidth: 2 // optional
        },
        {
          data:this.dataNeutral,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
          strokeWidth: 2 // optional
        },
        {
          data:this.dataAngry,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }],
      legend: ["Happy", "Sad", "Neutral", "Angry"]
    }
    this.forceUpdate();
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    const { hasCameraPermission, cameraType} = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } 
    else if (hasCameraPermission === false) {
      return <Text> Access to camera has been denied. </Text>;
    }
    return (
      <React.Fragment>
        <View style = {styles.button}>
          {this.state.bool
          ? <View style={styles.preview}>
              <Camera
                style={styles.preview}
                type={cameraType}
                ref={camera => this.camera = camera}
                onFacesDetected={this.state.faceDetecting ? this.onFacesDetected : undefined}
                onFaceDetectionError={this.onFaceDetectionError}>   
              </Camera>
              {this.state.faceDetecting && this.renderFaces()}
              {this.state.faceDetecting && this.renderLandmarks()}
              <View style={styles.graf}>
                <Fun
                  data={this.data}
                  chartConfig={chartConfig}
                  screenWidth={screenWidth}
                  screenheight={screenheight}
                />
                <View style={styles.bot}>
                  <TouchableOpacity style={styles.backbutton}
                    onPress={ () =>this._switch2()}>
                    <Ionicons
                      name="md-arrow-back"
                      color="black"
                      size={30}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.toggleFaceDetection}>
                    <MaterialIcons 
                      name="tag-faces"
                      size={32}
                      color={this.state.faceDetecting ? "white" : "#858585" }

                    />
                  </TouchableOpacity>
                  <Toolbar 
                    cameraType={cameraType}
                    setCameraType={this.setCameraType}/>
                  </View>                
                </View>
              </View>
            :<View>
          <Button onPress={() => this._switch()} title="camera"/>
        </View>}
      </View>
    </React.Fragment>);
  };
};
