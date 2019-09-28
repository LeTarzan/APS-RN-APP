import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux'


class ListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lista: []
    }
    this.getDataFromAPI = this.getDataFromAPI.bind(this)
  }

  async getDataFromAPI() {
    await fetch("https://d912e56a.ngrok.io/user/batata",
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }

      })
      .then(async result => {

        if (result.status !== 200) {
          console.log('error...', result.message)
        }
        console.log('resultado.. ', result)
        return result.json()
      })
      .then(async result => {
        console.log('rsrs', result)
        this.setState({
          lista: result
        }, () => console.log("Ok.."))
      })
      .catch(err => console.log('error... ', err))
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.getDataFromAPI()}>
          <Text>Consultar DB</Text>
        </TouchableHighlight>

        <Text>{this.state.lista.username}</Text>


        <TouchableHighlight onPress={() => Actions.home()}>
          <Text >Voltar para home</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
