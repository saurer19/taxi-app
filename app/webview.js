import React, { Component } from 'react';
import { WebView,View,Text } from 'react-native';
var POST_URL = 'http://app.tzone.run/mercadopago/pay.php';

export default class Web extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded:false,
      paymenturl:" ",
    };
  }

  componentDidMount(){
    this.XMLHttpRequestData();

  }


  XMLHttpRequestData() {
    var request = new XMLHttpRequest();
    var param = new FormData();
    param.append('amount', this.props.pay);
    request.open('POST', POST_URL,true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onload = () => {
      console.log('hola');
      if (request.status === 200){
        result = JSON.parse(request.responseText);
        console.log(result);
        this.setState({
          loaded: true,
          paymenturl: result
        });
      } else {
        console.warn('error');
      }
    };
    request.send('amount='+this.props.pay);
   }
    render() {
      if(!this.state.loaded){
        return this.renderLoadingView();
      }
        return (
            <WebView
                source={{uri: this.state.paymenturl}} style={{marginTop: 70}} />
        );
    }
    renderLoadingView(){
      return(
        <View>
          <Text style={{marginTop: 80,textAlign: 'center',fontFamily: 'BungeeInline-Regular',fontSize:14}} >
            Cargando...
          </Text>
        </View>
      );
    }
  }
