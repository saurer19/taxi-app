import React, { Component } from 'react';
import {
  View,TextInput, StyleSheet,ListView,Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Button, SearchBar,
} from 'react-native-elements';

var REQUEST_URL="https://api.myjson.com/bins/w2odf";

export default class ListTaxi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:  new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded:false,
      jdata: [],
    }
  }
  componentDidMount(){
    this.fetchData();
  }
fetchData() {
   fetch(REQUEST_URL)
   .then((response) =>response.json())
   .then((responseData) => {
     this.setState({
     dataSource: this.state.dataSource.cloneWithRows(responseData.data),
     loaded:true,
     jdata: responseData.data
   });
 }).done();
 }

 onPressButtonPOST(){
   console.log("Prueba :" +this.props.pay)
        fetch("http://app.tzone.run/mercadopago/pago.php", {method: "POST", body: JSON.stringify({amount: this.props.pay})})
        .then((response) => response.json())
        .then((responseData) => {Actions.web({url:responseData})})
        .done();
    }

  Finder(text){
    var textoTecleado=text
    var tempFilter=this.state.jdata.filter(function (taxista, i){
      if(taxista.name.indexOf(textoTecleado)>=0){
        return taxista
      }
    })
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(tempFilter)
    });
  }


  render(){
    if(!this.state.loaded){
      return this.renderLoadingView();
    }
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTaxi.bind(this)}
        style={styles.listView}
        renderHeader={(props)=> (
          <SearchBar
          lightTheme
          onChangeText={(text) => this.Finder(text, this.state.dataSource) }
          placeholder='Type Here...' />
        )
          }
      />
    );
  }

  renderLoadingView(){
    return(
      <View>
        <Text style={{marginTop: 80,textAlign: 'center'}} >
          Cargando...
        </Text>
      </View>
    );
  }
  renderTaxi(data){
    return(
      <View style={styles.rightContainer}>
        <Text style={styles.title}
          onPress={this.onPressButtonPOST.bind(this)}>
          {data.name}
        </Text>
      </View>
    )
  }


}
const styles = StyleSheet.create({

  rightContainer: {
      flex: 1,
    },
    listView: {
    marginTop: 44,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

})
