import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Testando... Rodou!</Text> */}
        <Text>Bem vindo!</Text>
        <TouchableHighlight onPress={() => Actions.list()}>
          <Text>Ir para lista</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
