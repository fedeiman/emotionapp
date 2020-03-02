// src/camera.page.js file
import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import { View, Text, Button, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import Toolbar from './toolbar.component';
import styles from './styles';
import Fun from './graf';
import * as FaceDetector from 'expo-face-detector';

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

happy = 0;
lef = 0;
rig = 0;

edit = (smilingProbability, leftEyeOpenProbability, rightEyeOpenProbability) => {
  
  a = smilingProbability
  b = leftEyeOpenProbability
  c = rightEyeOpenProbability
  y = 0

  e = ((b + c)/2)*100
  
  a = (a * 100) 
 
  if (a != 0)
    y = 100 - a

  dat.info.push({
    "Happy": a,
    "Neutral": y,
    "Eyes": e,
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
  dataNeutral = new Array(6).fill(0);
  dataEyes = new Array(6).fill(0);
  state = {
      cameraType: null,
      hasCameraPermission: null,
      bool: false,
      faceDetecting: false,
      faces: [],
  };

  toggleFaceDetection = () => this.setState({ faceDetecting: !this.state.faceDetecting });

  onFacesDetected = ({ faces }) => this.setState({ faces });
  onFaceDetectionError = state => console.warn('Faces detection error:', state);

  renderFace = ({bounds, faceID, rollAngle, yawAngle, smilingProbability,leftEyeOpenProbability,rightEyeOpenProbability }) => {       
    if(this.state.faces.length == 1 || this.state.faces.length == 0 ){
      happy = smilingProbability;
      lef = leftEyeOpenProbability;
      rig = rightEyeOpenProbability;
      }
      else{
        happy = 0;
        lef = 0;
        rig = 0;
        for(let i = 0; i < this.state.faces.length; i++ ){
          happy = this.state.faces[i].smilingProbability + happy
          lef = this.state.faces[i].leftEyeOpenProbability + lef
          rig = this.state.faces[i].rightEyeOpenProbability + rig
        }
        happy = happy/this.state.faces.length
        rig = rig/this.state.faces.length
        lef = lef/this.state.faces.length
      }
    return (
      <View
        key={faceID}
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
        <Text style={styles.faceText}>ID: {faceID+1}</Text>
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
      const hasCameraPermission = (camera.status === 'granted');
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
    if(this.state.faceDetecting){
      edit(happy, lef, rig)
    }
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
      this.dataNeutral.splice(i, 1, this.dataNeutral[i+1])
      this.dataEyes.splice(i, 1, this.dataEyes[i+1])
    }
    if(this.j < (dat.info.length)){
      this.dataHappy.splice(5, 1, dat.info[this.j].Happy)
      this.dataNeutral.splice(5, 1, dat.info[this.j].Neutral)
      this.dataEyes.splice(5, 1, dat.info[this.j].Eyes)
      this.j ++
    }
    else{
      this.dataHappy.splice(5, 1, 0)
      this.dataNeutral.splice(5, 1, 0)
      this.dataEyes.splice(5, 1, 0)
    }
    this.data = {
      datasets : [
        {
          data: this.dataHappy, 
          color: (opacity = 1) => `rgba(246, 9, 9, ${opacity})`, // optional
          strokeWidth: 2 // optional
        },
        {
          data:this.dataNeutral,
          color: (opacity = 1) => `rgba(35, 133, 5, ${opacity})`, // optional
          strokeWidth: 2 // optional
        },
        {
          data:this.dataEyes,
          color: (opacity = 1) => `rgba(136, 13, 155, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Happy", "Neutral", "Open Eyes"]
    }
    this.forceUpdate();
  }
  async _permission()  {
    camera = await Permissions.askAsync(Permissions.CAMERA);
    hasCameraPermission = (camera.status === 'granted');
    this.setState({hasCameraPermission})
    this.forceUpdate();
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    const { hasCameraPermission, cameraType} = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } 
    else if (hasCameraPermission === false) {
      return <View style={styles.errorscreen}>
        <Text style={styles.text}>Permissions denied</Text>
        <TouchableOpacity
        onPress={ () => this._permission()}>
          <Ionicons
            name="md-refresh"
            color="black"
            size={90}
            />
          </TouchableOpacity>
      </View>
      
    }

    return (
      <React.Fragment>
        <View style = {styles.button}>
          {this.state.bool?
          <View style={styles.preview}>
            <Camera
              style={styles.preview}
              type={cameraType}
              ref={camera => this.camera = camera}
              onFacesDetected={this.state.faceDetecting ? this.onFacesDetected : undefined}
              onFaceDetectionError={this.onFaceDetectionError}
              faceDetectorSettings=
                {{
                  mode: FaceDetector.Constants.Mode.fast,
                  detectLandmarks: FaceDetector.Constants.Landmarks.none,
                  runClassifications: FaceDetector.Constants.Classifications.all,
                  minDetectionInterval: 100,
                  tracking: true,
                }}
              >   
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
                  <MaterialIcons name="tag-faces" size={32} color={this.state.faceDetecting ? "green" : "black" } />
                </TouchableOpacity>
                <Toolbar 
                  cameraType={cameraType}
                  setCameraType={this.setCameraType}
                />
              </View>                
            </View>
          </View>:
          <View style = {styles.button}>
            <ImageBackground source={require('../assets/splash.png')} style={styles.button}>
              <View style = {styles.cambutton}>
                <TouchableOpacity onPress={ () =>this._switch()}>
                        <Ionicons
                          name="ios-arrow-dropright"
                          color="black"
                          size={90}
                        />
                </TouchableOpacity>
              </View>
              <View style={styles.button2}>
                  <Ionicons
                    name="logo-github"
                    color="black"
                    size={20}
                  />
                  <Text>  UNX Digital</Text>
                </View>
            </ImageBackground>
          </View>}
        </View>
      </React.Fragment>);
    };
  };
