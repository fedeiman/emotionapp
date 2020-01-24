import React from 'react';
import { StyleSheet,
  Button,
  View,
  Alert,} from 'react-native';
import Fun from './src/graf'

// function Fun() {
//  return(Alert.alert('Simple Button pressed'));
//} 

export default function App() {
  return (
    <Fun/>
  );
}

/* 
<View  style={{
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center'}}
>
<Button
  onPress={() => {Alert.alert('DFSGSG')}}
  title="Click ME"
  color="blue"
/>
</View> */
//const styles = StyleSheet.create({
  //container: {
    //flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
 // },//});
