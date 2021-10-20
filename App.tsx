import React from 'react';
import { Appbar, Avatar, Card, FAB, IconButton } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as cls from './class';

const addClass = (classes) => {
  let newClass = new cls.Class('Inglês');

  return classes.concat(newClass);
}

const ClassCard = (props) => {
  const [gpsEnabled, setGpsEnabled] = React.useState(props.obj.gpsEnabled);

  return (
    <Card key={props.index} onPress={() => props.navigation.navigate('EditClass', { name: 'Teste' })} style={props.index % 2 == 0 ? styles.cardPurple : styles.cardPink} mode="outlined">
      <IconButton style={gpsEnabled ? styles.geoIconEnabled : styles.geoIconDisabled} icon="map-marker" size={20} onPress={() => { setGpsEnabled(!gpsEnabled); props.obj.gpsEnabled = !gpsEnabled; console.log(props.obj.gpsEnabled); }} />
      <Card.Title title={props.obj.name}/>
    </Card>
  );
}

const Main = ({ navigation, route}) => {
  const [active, setActive] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const defaultClass = new cls.Class('Português');
  const [classes, setClasses] = React.useState([
    defaultClass,
  ]);

  return (
    <View style={styles.mainView}>

      <Appbar.Header style={styles.appbar} statusBarHeight={5}>
        <Avatar.Image style={styles.avatar} size={50} source={require('./assets/avatar.jpeg')} />
        <Appbar.Content title="Presencemeter" subtitle="Main Screen" />
        <Appbar.Action style={styles.cog} icon="cog" onPress={() => setClasses([defaultClass])} />
      </Appbar.Header>

      <ScrollView style={styles.cardsView}>
        {
          classes.map((c, i) => {
            return (
              <ClassCard key={i} obj={c} index={i} navigation={navigation} />
            );
          })
        }
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setClasses(addClass(classes))}
      />
    </View>
  );
}

export default Main;

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
  cardsView: {
    margin: 20,
  },
  cardPurple: {
    minHeight: 100,
    marginBottom: 15,
    backgroundColor: '#d1ccdc',
    borderColor: '#000000'
  },
  cardPink: {
    minHeight: 100,
    marginBottom: 15,
    backgroundColor: '#f5edf0',
    borderColor: '#000000'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  containerStyle: {
    margin: 20,
    padding: 30,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: 400,
    minWidth: 360,
  },
  geoIconEnabled: {
    opacity: 1
  },
  geoIconDisabled: {
    opacity: 0.2
  }
});