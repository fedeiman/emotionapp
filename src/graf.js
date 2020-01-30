import React, {Component} from 'react';
import {Text, View, Alert, Button, TouchableOpacity} from 'react-native';
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

  const info = require('./data.json')

  const colors = [ '#8800cc', '#aa00ff', '#cc66ff', '#eeccff' ]
  const keys   = [ 'Happy', 'Sad', 'Neutral', 'Angry' ]

  const svgs = [
    { onPress: () => Alert.alert('Happy') },
    { onPress: () => Alert.alert('Sad') },
    { onPress: () => Alert.alert('Neutral')},
    { onPress: () => Alert.alert('Angry') },
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

    datos = () => data = [
      {
        Data: 1,
        Happy: info.info[0].Happy,
        Sad: info.info[0].Sad,
        Neutral: info.info[0].Neutral,
        Angry: info.info[0].Angry,
      },
      {
        Data: 2,
        Happy: info.info[1].Happy,
        Sad: info.info[1].Sad,
        Neutral: info.info[1].Neutral,
        Angry: info.info[1].Angry,
      },
      {
        Data: 3,
        Happy: info.info[2].Happy,
        Sad: info.info[2].Sad,
        Neutral: info.info[2].Neutral,
        Angry: info.info[2].Angry,
      },
      {
        Data: 4,
        Happy: info.info[3].Happy,
        Sad: info.info[3].Sad,
        Neutral: info.info[3].Neutral,
        Angry: info.info[3].Angry,
      }
    ] 
  
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
          <StackedAreaChart
              style={ { height: 200, paddingVertical: 16 } }
              data={ data }
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
