import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity, Dimensions} from 'react-native';
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

  export default class Fun extends Component {
    data = {};
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
        this.dataHappy[i] = dat.info[i].Happy,
        this.dataSad[i] =  dat.info[i].Sad,
        this.dataNeutral[i] = dat.info[i].Neutral,
        this.dataAngry[i] = dat.info[i].Angry
        }
        this.data = {
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
              data={this.data}
              width={screenWidth}
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
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
