import React, {Component} from 'react';
import {Text, View, Alert, Button, TouchableOpacity, Dimensions} from 'react-native';
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {
  LineChart
} from "react-native-chart-kit";

  const dat = require('./data.json')

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
  };

  const screenWidth = Dimensions.get("window").width;

  const colors = [ '#8800cc', '#aa00ff', '#cc66ff', '#eeccff' ]
  const keys   = [ 'Happy', 'Sad', 'Neutral', 'Angry' ]
 
  const svgs = [
    { onPress: () => Alert.alert('Happy') },
    { onPress: () => Alert.alert('Sad') },
    { onPress: () => Alert.alert('Neutral')},
    { onPress: () => Alert.alert('Angry') },
  ] 

  export default class Fun extends Component {
    data = [];
    data1 = {};
    dataHappy = [];
    dataSad = [];
    dataNeutral = [];
    dataAngry = [];

    state = {bool: true, reset: true, count: 1}

    componentDidMount(){
      setInterval(() => (
        this.setState(previousState => (
          { reset: !previousState.reset}
        )),
        this.state.count = this.state.count + 1 
      ), 100); 
    }

    datos = () => {
      for (let i=0; i < (dat.info.length); i++) {
        this.data[i] =
          {
            Data: 1,
            Happy: dat.info[i].Happy,
            Sad: dat.info[i].Sad,
            Neutral: dat.info[i].Neutral,
            Angry: dat.info[i].Angry,
          },
        this.dataHappy[i] = dat.info[i].Happy,
        this.dataSad[i] =  dat.info[i].Sad,
        this.dataNeutral[i] = dat.info[i].Neutral,
        this.dataAngry[i] = dat.info[i].Angry
        }
        this.data1 = {
        labels : ["Happy", "Sad", "Neutral", "Angry"],
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
          }
        ]
      }
    }
  
    _switch = () => {
        this.setState({
            bool: false
        })
    }

    render() {
      if(this.state.reset) {
        this.datos()
      }
      return(
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'}}>
          {this.state.bool
          ? 
          <View>
            <Button
              title='Click me'
              onPress={() => this._switch()}
            />
          </View>
          :
          <View>
            <LineChart
                  data={this.data1}
                  width={screenWidth}
                  height={256}
                  verticalLabelRotation={30}
                  chartConfig={chartConfig}
                  bezier
            />
            <StackedAreaChart
                style={ { height: 200, paddingVertical: 16 } }
                data={ this.data }
                keys={ keys }
                colors={ colors }
                curve={ shape.curveNatural }
                showGrid={ false }
                svgs={ svgs }
              /> 
            <TouchableOpacity
              onPress={() => {this.setState({bool: true})}}>
            <Text> Back </Text>
            </TouchableOpacity>
          </View>}
        </View>
      );
      }
    }
