import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity, Dimensions} from 'react-native';
import {LineChart} from "react-native-chart-kit";
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

  export default class Fun extends Component {

    data = {};
    dataHappy = new Array(6).fill(0);
    dataSad = new Array(6).fill(0);
    dataNeutral = new Array(6).fill(0);
    dataAngry = new Array(6).fill(0);
    j = 0;

    state = {bool: true, reset: true}

    componentDidMount(){
      setInterval(() => (
        this.setState(previousState => (
          { reset: !previousState.reset}
        )),
        edit()
        ), 1000); 
    }

    datos = () => {
        if(this.j < (dat.info.length)){
          for(let i=0; i < 5; i++){
            this.dataHappy.splice(i, 1, this.dataHappy[i+1])
            this.dataSad.splice(i, 1, this.dataSad[i+1])
            this.dataNeutral.splice(i, 1, this.dataNeutral[i+1])
            this.dataAngry.splice(i, 1, this.dataAngry[i+1])
          }
        this.dataHappy.splice(5, 1, dat.info[this.j].Happy)
        this.dataSad.splice(5, 1, dat.info[this.j].Sad)
        this.dataNeutral.splice(5, 1, dat.info[this.j].Neutral)
        this.dataAngry.splice(5, 1, dat.info[this.j].Angry)
        this.j ++
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
          }
        ],
        legend: ["Happy", "Sad", "Neutral", "Angry"],
        legendFontSize: 85
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
              //legend={{enable:true, position:'ABOVE_CHART_BOTTOM',direction:"LEFT_TO_RIGHT", legendForm: "CIRCLE"}}
              width={screenWidth}
              showLegend={false}
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

/* 
    horizontalAlignment, verticalAlignment, orientation, drawInside, direction. */