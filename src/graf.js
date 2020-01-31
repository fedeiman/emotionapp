import React, {Component} from 'react';
import {Text, View, Alert, Button, TouchableOpacity} from 'react-native';
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

  const dat = require('./data.json')

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
          }
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
