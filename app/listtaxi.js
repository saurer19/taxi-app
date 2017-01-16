import React, { Component } from 'react';
import {
  View,TextInput, StyleSheet,ListView,Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Button, SearchBar,Icon,
} from 'react-native-elements';
import jnames from './names.json'

var REQUEST_URL="http://12x3taxi.com.ve/taxi/public/mobile/";
var POST_URL = 'http://app.tzone.run/mercadopago/pay.php';
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
   fetch(REQUEST_URL+this.props.id)
   .then((response) =>response.json())
   .then((responseData) => {
     console.log(responseData);
     this.setState({
     dataSource: this.state.dataSource.cloneWithRows(responseData),
     loaded:true,
     jdata: responseData
   });
 }).done();
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
        <Text style={{marginTop: 80,textAlign: 'center',fontFamily: 'BungeeInline-Regular',fontSize:14}} >
          Cargando...
        </Text>
      </View>
    );
  }
  renderTaxi(data){
    return(
      <View style={styles.rightContainer}>
        <Icon
          name='taxi'
          type='font-awesome'
          color='#000'
        />
        <Text style={styles.title}
          onPress={() => Actions.web({pay:this.props.pay})}>
          {data.name}
        </Text>
      </View>
    )
  }


}
const styles = StyleSheet.create({

  rightContainer: {
    padding:10,
      flex: 1,
      flexDirection: 'row',
    },
  listView: {
    backgroundColor:"yellow",
    marginTop: 30,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'BungeeInline-Regular',fontSize:18,
    marginTop:10,
    marginLeft:10,
    marginBottom: 8,
    textAlign: 'center',
    color: 'black'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

})
