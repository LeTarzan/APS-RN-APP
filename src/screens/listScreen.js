import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux'

class ListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lista: [],
      switchValue: false
    }
    this.getDataFromAPI = this.getDataFromAPI.bind(this)
    this.toggleSwitch = this.toggleSwitch.bind(this)
    this.tableData = this.tableData.bind(this)
    this.verifySwitch = this.verifySwitch.bind(this)
  }

  async getDataFromAPI() {
    await fetch("https://4ab7bda7.ngrok.io/arduino/1",
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

  toggleSwitch(value) {
    this.setState({ switchValue: value })
  }

  verifySwitch() {
    if (this.state.switchValue) { 
      console.log('Entrou..')
      setTimeout(() => {
        this.getDataFromAPI()
      }, 5000);
    }
  }

  tableData() {
    if (this.state.lista.length !== 0) {
      return (
        <>
          <Text style={styles.texts}>Nível de luz: {this.state.lista.l_lightness}</Text>
          <Text style={styles.texts}>Temperatura: {this.state.lista.l_temperature}</Text>
          <Text style={styles.texts}>Umidade: {this.state.lista.l_moisture}</Text>
        </>
      )
    }
  }

  render() {
    return (
      <>
        <View style={styles.header}>
          <Image style={styles.foto} source={require('../images/leaf2.png')} />
        </View>

        <View style={styles.container}>
          <Text style={styles.texts}>{this.state.switchValue ? 'Desligar' : 'Ligar'}</Text>
          <Switch
            style={{ marginTop: 10 }}
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue}
          />
          {this.tableData()}
          {this.verifySwitch()}
        </View>

        <View style={styles.footer}>
          <TouchableHighlight onPress={() => Actions.home()}>
            <Text style={styles.texts}>Voltar para home</Text>
          </TouchableHighlight>
        </View>
      </>
    );
  }
}

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  foto: {
    marginTop: 20,
    resizeMode: 'contain',
    width: '80%',
    height: '80%'
  },
  texts: {
    fontSize: 20,
    textAlign: 'center',
    color: '#008000',
  },
  footer: {
    backgroundColor: '#fff',
    marginBottom: 10
  }
});