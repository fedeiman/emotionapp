import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import styles from './styles.js';
  
 /*  const dat = require('./data.json')

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
 */
  export default function Fun({data, chartConfig, screenWidth, screenheight} = props){
/* 
    data = {};
    dataHappy = new Array(6).fill(0);
    dataSad = new Array(6).fill(0);
    dataNeutral = new Array(6).fill(0);
    dataAngry = new Array(6).fill(0);
    j = 0;

    state = {reset: true}

    componentDidMount(){
        timer = setInterval(() => (
        this.setState(previousState => (
          {reset: !previousState.reset}
        )),
        edit()
        ), 1000); 
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
      }
      else{
        this.dataHappy.splice(5, 1, 0)
        this.dataSad.splice(5, 1, 0)
        this.dataNeutral.splice(5, 1, 0)
        this.dataAngry.splice(5, 1, 0)
      }
      this.j ++
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
        legend: ["Happy", "Sad", "Neutral", "Angry"]
      }
    } */

        return(
          <View style={styles.graf}>
              <LineChart
                data={data}
                width={screenWidth}
                height={screenheight/2.6}
                chartConfig={chartConfig}
                bezier
              />
          </View>
        );
    }