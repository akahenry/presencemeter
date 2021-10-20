import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';

const EditClass = ({ navigation }) => {
  return (
    <View style={styles.mainView}>
        <Appbar.Header style={styles.appbar} statusBarHeight={5}>
            <Avatar.Image style={styles.avatar} size={50} source={require('./assets/avatar.jpeg')} />
            <Appbar.Content title="Presencemeter" subtitle="Aula" />
            <Appbar.Action style={styles.cog} icon="cog" onPress={() => console.log("cog clicked")} />
        </Appbar.Header>
        <Text>
        Teste usando parametros
        </Text>
    </View>
  );
}

export default EditClass;

const styles = StyleSheet.create({
    mainView: {
        height: "100%",
    },
    appbar: {
        marginBottom: 15,
        backgroundColor: '#17bebb'
    },
    avatar: {
        marginLeft: 10,
        marginTop: 5,
    },
    cog: {
        marginTop: 15,
    },
});