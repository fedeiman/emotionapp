import React, {Component} from 'react';
import {Text, View, Dimensions, Button, TouchableOpacity} from 'react-native';
import {BarChart} from "react-native-chart-kit";
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

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

  const graphStyle = style={
      marginVertical: 8,
      borderRadius: 16
    }

    const colors = [ '#8800cc', '#aa00ff', '#cc66ff', '#eeccff' ]
    const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ]

    const svgs = [
      { onPress: () => console.log('apples') },
      { onPress: () => console.log('bananas') },
      { onPress: () => console.log('cherries') },
      { onPress: () => console.log('dates') },
    ]

    const data1 = [
      {
          month: new Date(2015, 0, 1),
          apples: 3840,
          bananas: 1920,
          cherries: 960,
          dates: 400,
      },
      {
          month: new Date(2015, 1, 1),
          apples: 1600,
          bananas: 1440,
          cherries: 960,
          dates: 400,
      },
      {
          month: new Date(2015, 2, 1),
          apples: 640,
          bananas: 960,
          cherries: 3640,
          dates: 400,
      },
      {
          month: new Date(2015, 3, 1),
          apples: 3320,
          bananas: 480,
          cherries: 640,
          dates: 400,
      },
  ]

  export default class Fun extends Component {

    state = {bool: true, reset: true, count: 1}

    componentDidMount(){
      setInterval(() => (
        this.setState(previousState => (
          { reset: !previousState.reset}
        )),
        this.state.count = this.state.count + 1 
      ), 100); 
    }

    datos = () => data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        { 
          data:[
            this.state.count % 10,
            (this.state.count * 5 + 3) % 20,
            Math.random() * (this.state.count % 15),
            (Math.random() / 5) * (this.state.count % 30),
            Math.random(),
            10 - this.state.count % 10
          ]
      }
    ]
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
            <BarChart
              style={graphStyle}
              data={data}
              width={screenWidth}
              height={220}
              yAxisLabel="$"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
             <StackedAreaChart
                style={ { height: 200, paddingVertical: 16 } }
                data={ data1 }
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