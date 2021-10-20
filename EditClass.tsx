import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const EditClass = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Text>
        Teste usando parametros
      </Text>
    </View>
  );
}

export default EditClass;

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'black'
    }
});