import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Picker from 'react-native-picker';
import {
  Button
} from 'react-native-elements';
var REQUEST_URL = 'http://12x3taxi.com.ve/taxi/public/lines';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {te:" ",line:" ",error: " ", lines:[],loaded:false, id:0};
    }

    componentDidMount(){
      this.XMLHttpRequestData();
    }

    XMLHttpRequestData() {
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4){
          return;
        }
        if (request.status === 200){
          result = JSON.parse(request.responseText);
          for (var i = 0, taxi; i < result.length; i++){
            taxi = result[i];
            this.setState({
              lines: this.state.lines.concat([result[i]]),
              loaded : true
            });
          }
          console.log(this.state.lines[0].name);
        } else {
          console.warn('error');
        }
      };
      request.open('GET', REQUEST_URL);
      request.send();
     }
  _showPicker(){
    let data = [];
    for(var i=1000;i<20000;i+=100){
        data.push(i);
    }
    Picker.init({
        pickerTitleText: "Bsf.",
        pickerData: data,
        pickerBg:[255,255,255,1],
        pickerToolBarBg:[0,0,0,1],
        pickerTitleColor:[255,255,255,1],
        pickerCancelBtnColor:[0,255,0,1],
        pickerConfirmBtnColor:[0,255,0,1],
        pickerCancelBtnText:"Cancelar",
        pickerConfirmBtnText:"Continuar",
        selectedValue: [4000],
        onPickerConfirm: data => {
            this.setState({te:data});
        }
    });
    Picker.show();
  }
  _showLines(){
    let data =[];
    let dataid = [];
    for (var i=0; i<this.state.lines.length; i++){
      data[i]= this.state.lines[i].name;
      dataid[i]= this.state.lines[i].id;
    }
    Picker.init({
        pickerTitleText: "Linea de Taxi",
        pickerData: data,
        pickerBg:[255,255,255,1],
        pickerToolBarBg:[0,0,0,1],
        pickerTitleColor:[255,255,255,1],
        pickerCancelBtnColor:[0,255,0,1],
        pickerConfirmBtnColor:[0,255,0,1],
        pickerCancelBtnText:"Cancelar",
        pickerConfirmBtnText:"Continuar",
        selectedValue: ['Taxi Unimet'],
        onPickerConfirm: (data, pickedIndex) => {
          this.setState({
            line:data,
            id:dataid[pickedIndex],
          });
        }
    });
    Picker.show();
  }
  _validate(){
    if (this.state.te != " " && this.state.line != " "){
       Actions.list({pay:this.state.te, line:this.state.line,id:this.state.id, title: this.state.line});
    }
    this.setState({error:'Seleccione todos los campos.'});

  }
  render(){
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    var MyText = function(t) {
       return(
         <Text style={{textAlign: 'center',
         fontFamily: 'BungeeInline-Regular',fontSize:20}}>
           {t}
         </Text>
       )
     }

     var MyError = function(t) {
       console.log(t);

        return(
          <Text style={{color:'red',textAlign: 'center',}}>
            {t}
          </Text>
        )
      }

    return(
      <View style={{backgroundColor:"yellow",flex:1}}>
        <View style={{flexDirection:'row',justifyContent:'center'}}><Image resizeMode="contain"  source={require('./img/taxi.png')} style={{width:60,height:60,marginTop:30}} /></View>
        <Text style={{marginTop: 10,fontSize: 40,
          textAlign: 'center',
          fontFamily: 'BungeeInline-Regular',
          margin: 10,
          color: 'black',
        }}>
          1,2 x 3 Taxi
        </Text>
        <TouchableOpacity style={{marginTop: 25, marginLeft: 20,marginRight:20,}} onPress={this._showPicker.bind(this)}>
            <Text style={{paddingBottom:10}}>Seleccione Monto a Pagar</Text>
            <View style={{borderWidth: 1,
            borderRadius: 8,
            padding:3,
            backgroundColor:'#fff',
            borderColor: '#666',}}>{MyText(this.state.te)}</View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 25, marginLeft: 20,marginRight:20}} onPress={this._showLines.bind(this)}>
            <Text style={{paddingBottom:10}}>Seleccione Linea de Taxi</Text>
            <View style={{borderWidth: 1,
            borderRadius: 8,
            padding:3,
            backgroundColor:'#fff',
            borderColor: '#666',}}>{MyText(this.state.line)}</View>
        </TouchableOpacity>

        <Button
          buttonStyle={{marginTop: 25, marginLeft: 20,borderWidth: 1,
          borderRadius: 8 }}
          fontFamily="BungeeInline-Regular"
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
  renderLoadingView(){
    return(
        <View style={{backgroundColor:"yellow",flex:1}}>
          <View style={{flexDirection:'row',justifyContent:'center'}}><Image resizeMode="contain"  source={require('./img/taxi.png')} style={{width:60,height:60,marginTop:30}} /></View>
          <Text style={{marginTop: 10,fontSize: 40,
            textAlign: 'center',
            fontFamily: 'BungeeInline-Regular',
            margin: 10,
            color: 'black',
          }}>
            1,2 x 3 Taxi
          </Text>
        <Text style={{marginTop: 80,textAlign: 'center',fontFamily: 'BungeeInline-Regular',fontSize:14}} >
          Cargando...
        </Text>
      </View>
    );
  }
}
