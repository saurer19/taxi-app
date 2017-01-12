import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Picker from 'react-native-picker';
import {
  Button
} from 'react-native-elements';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {te:" ",line:" ",error: " "};
    }


  _showPicker(){
    let data = [];
    for(var i=1000;i<20000;i+=100){
        data.push(i);
    }
    Picker.init({
        pickerTitleText: "Bsf.",
        pickerData: data,
        selectedValue: [4000],
        onPickerConfirm: data => {
            this.setState({te:data});
        }
    });
    Picker.show();
  }
  _showLines(){
    items = ['Taxi Unimet','Taxi UCAB'];
    Picker.init({
        pickerTitleText: "Linea de Taxi",
        pickerData: items,
        selectedValue: ['Taxi Unimet'],
        onPickerConfirm: items => {
          this.setState({line:items});
        }
    });
    Picker.show();
  }
  _validate(){
    if (this.state.te != " " && this.state.line != " "){
       Actions.list({pay:this.state.te, line:this.state.line, title: this.state.line});
    }
    this.setState({error:'Seleccione todos los campos.'});

  }
  render(){
    var MyText = function(t) {
       return(
         <Text>
           {t}
         </Text>
       )
     }
     var MyError = function(t) {
       console.log(t);

        return(
          <Text style={{color:'red'}}>
            {t}
          </Text>
        )
      }

    return(
      <View>
        <Text style={{marginTop: 40,fontSize: 40,
        textAlign: 'center',
        margin: 10,
      }}>
        12x3Taxi
      </Text>
        <TouchableOpacity style={{marginTop: 40, marginLeft: 20}} onPress={this._showPicker.bind(this)}>
            <Text>Seleccione Monto a Pagar</Text>
            {MyText(this.state.te)}
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 40, marginLeft: 20}} onPress={this._showLines.bind(this)}>
            <Text>Seleccione Linea de Taxi</Text>
            {MyText(this.state.line)}
        </TouchableOpacity>

        <Button
          buttonStyle={{marginTop: 80, marginLeft: 20 }}
          large
          onPress={this._validate.bind(this) }
          iconRight
          icon={{name: 'code', color: 'black'}}
          backgroundColor= 'yellow'
          color = 'black'
          title='Siguiente' />
          {MyError(this.state.error)}
      </View>
    );
  }
}
