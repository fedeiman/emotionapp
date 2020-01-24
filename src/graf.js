import React, {Component} from 'react';
import {Text, View, Dimensions, Button, TouchableOpacity} from 'react-native';
import {
    LineChart,
    BarChart
  } from "react-native-chart-kit";

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [50, 45, 28, 80, 99, 43]
      }
    ]
  };

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

  export default class Fun extends Component {
    
    state = {bool: true}
    
    _switch = () => {
        this.setState({
            bool: false
        })
    }
    render() {
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
              onPress={this._switch}
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
            <TouchableOpacity
              onPress={() => {this.setState({bool: true})}}>
              <Text> Back </Text>
              </TouchableOpacity>
          </View>}
        </View>
      );
    }
  }