import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'

class HomeScreen extends React.Component {
  render() {
    return (
      <>
        <View style={styles.containerFoto}>
          <Image style={styles.foto} source={require('../images/leaf2.png')} />
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.texts}>Bem vindo!</Text>
            <TouchableHighlight onPress={() => Actions.list()}>
              <Text style={styles.texts}>Ir para o Dashboard</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => Actions.list()}>
              <Text style={styles.texts}>Cadastrar um Padrão</Text>
            </TouchableHighlight>
          </View>
        </View>
      </>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  texts: {
    fontSize: 20,
    textAlign: 'center',
    // color: '#39FF14'
    color: '#008000',
    bottom: '30%'
  },
  containerFoto: {
    backgroundColor: '#fff',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  foto: {
    resizeMode: 'contain',
    top: '10%',
    justifyContent: 'center',
    width: '80%',
    height: '80%',
  }
});
