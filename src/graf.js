import React, {Component} from 'react';
import {Text, View, Alert, Button, TouchableOpacity} from 'react-native';
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import  {info} from './data.json'

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
        Happy:this.state.count % 10,
        Sad: (this.state.count + 3) % 15,
        Neutral:(this.state.count - 1) % 10,
        Angry: (Math.random()*100)%10,
      },
      {
        Data: 2,
        Happy: Math.random()*100,
        Sad: Math.random()*100,
        Neutral: Math.random()*100,
        Angry: Math.random()*100,
      },
      {
        Data: 3,
        Happy: Math.random()*100,
        Sad: Math.random()*100,
        Neutral: Math.random()*100,
        Angry: Math.random()*100,
      },
      {
        Data: 4,
        Happy: Math.random()*100,
        Sad: Math.random()*100,
        Neutral: Math.random()*100,
        Angry: Math.random()*100,
      },
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