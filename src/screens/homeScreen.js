import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Button } from 'react-native';
import { Actions } from 'react-native-router-flux'

class HomeScreen extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.containerFoto}>
            <Image style={styles.foto} source={require('../images/leaf2.png')} />
          </View>

          <View style={styles.containerTittle}>
            <Text style={styles.texts}>GARDUINO</Text>
          </View>

          <View style={styles.containerContent}>

            <View style={styles.containerButton}>
              <Button
                title="Dashboard"
                onPress={() => Actions.list()}
                color="#008000"
                height="50"
              />
            </View>

            <View style={styles.containerButton}>
              <Button
                title="Padrões"
                onPress={() => Actions.defaultScreen()}
                color="#008000"
                height="50"
              />
            </View>
          </View>
        </View>
        {/* <TouchableHighlight onPress={() => Actions.list()}>
            <Text style={styles.texts}>Ir para o Dashboard</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => Actions.defaultScreen()}>
            <Text style={styles.texts}>Definir um Padrão</Text>
          </TouchableHighlight> */}
      </>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerContent: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  containerButton: {
    flex: 1,
    marginRight: '5%',
    marginLeft: '5%'
  },
  containerTittle: {
    backgroundColor: '#fff',
    marginTop: 40,
    flex: 1,
  },
  texts: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    // color: '#39FF14'
    color: '#008000',
    bottom: '30%'
  },
  containerFoto: {
    backgroundColor: '#fff',
    flex: 4,
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
  },
});
