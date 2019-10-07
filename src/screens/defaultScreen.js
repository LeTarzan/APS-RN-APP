import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput, Button, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux'

const Toast = (props) => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

class DefaultScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id_user: '',
      default_name: '',
      l_moistureg: '',
      l_moisture: '',
      l_temperature: '',
      visible: false,
      toastMessage: '',
      linkAPI: 'https://661c617d.ngrok.io'
    }
    this.getDataFromAPI = this.getDataFromAPI.bind(this)
    this.saveDefault = this.saveDefault.bind(this)
    this.hideToast = this.hideToast.bind(this)
  }

  componentDidMount() {
    if (this.getDataFromAPI())
      console.log('rsrs', this.state)
  }

  async getDataFromAPI() {
    try {
      let link = this.state.linkAPI
      await fetch(link + "/default/1",
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
          console.log('rsrs...', result)
          result.default_name = result.default_name.toString()
          result.l_moisture = result.l_moisture.toString()
          result.l_moistureg = result.l_moistureg.toString()
          result.l_temperature = result.l_temperature.toString()
          console.log('to string... ', result)
          this.setState({
            id_user: result.id_user,
            default_name: result.default_name,
            l_moistureg: result.l_moistureg,
            l_moisture: result.l_moisture,
            l_temperature: result.l_temperature,
          }, () => console.log("Ok.."))
        })
        .catch(err => console.log('error... ', err))
    } catch (error) {
      console.log('error ao puxar dados da API', error)
    }
  }

  async saveDefault() {
    const { visible, toastMessage, linkAPI, ...data } = this.state
    console.log('entrou pra salvar...')
    try {
      let link = this.state.linkAPI
      await fetch(link + "/defaults/",
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(async result => {
          if (result) {
            this.state.toastMessage = "Padrão definido!"
            this.setState({ visible: true }, () => { this.hideToast() });
            return true
          }
          this.state.toastMessage = "Erro ao definir padrão!"
          this.setState({ visible: true }, () => { this.hideToast() });
          return false
        })
        .catch(err => console.log('error... ', err))
    } catch (error) {
      console.log('error ao puxar dados da API', error)
    }
  }

  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <View style={styles.container}>

          <View style={styles.header}>
            <Image style={styles.foto} source={require('../images/leaf2.png')} />
          </View>
          <View>
            <Text style={styles.texts}>GARDUINO</Text>
          </View>

          <View style={styles.containerContent}>
            <Text style={styles.texts}>Defina os valores desejados</Text>
            <TextInput
              placeholder="Nome do Padrão"
              underlineColorAndroid='transparent'
              style={styles.TextInputStyle}
              onChangeText={defaultname => this.setState({ default_name: defaultname })}
              value={this.state.default_name}
            />
            <TextInput
              placeholder="Nível de umidade"
              underlineColorAndroid='transparent'
              style={styles.TextInputStyle}
              keyboardType={'numeric'}
              onChangeText={moisture => this.setState({ l_moisture: moisture })}
              value={this.state.l_moisture}
            />
            <TextInput
              placeholder="Temperatura"
              underlineColorAndroid='transparent'
              style={styles.TextInputStyle}
              keyboardType={'numeric'}
              onChangeText={temperature => this.setState({ l_temperature: temperature })}
              value={this.state.l_temperature}
            />
            <TextInput
              placeholder="Nível de umidade de solo"
              underlineColorAndroid='transparent'
              style={styles.TextInputStyle}
              keyboardType={'numeric'}
              onChangeText={moistureg => this.setState({ l_moistureg: moistureg })}
              value={this.state.l_moistureg}
            />
            <Button
              title="Salvar"
              onPress={() => this.saveDefault()}
              color="#008000"
              width="80"
              height="50"
            />
            <Toast visible={this.state.visible} message={this.state.toastMessage} />
          </View>

          <View style={styles.footer}>
            <TouchableHighlight onPress={() => Actions.home()}>
              <Text style={styles.texts}>Voltar para home</Text>
            </TouchableHighlight>
          </View>
        </View>
      </>
    );
  }
}

export default DefaultScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  containerContent: {
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
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: '#fff',
    marginBottom: 10
  },
  TextInputStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#008000'
  },
  buttonStyle: {
    color: "#008000",
    width: 50,
    height: 30
  }
});