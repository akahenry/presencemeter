import React from 'react';
import { Appbar, Avatar, Card, FAB, Portal, Modal, DarkTheme } from 'react-native-paper';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const addClass = (classes) => {
  const newClass = {
    name: 'Português',
    subtitle: 'Alguma informação sobre a materia',
  }

  return classes.concat(newClass);
}

const Main = ({ navigation, route}) => {
  const [active, setActive] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const defaultClass = {
    name: 'Português',
    subtitle: 'Alguma informação sobre a materia',
  }
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
              <Card key={i} style={styles.card} onPress={() => navigation.navigate('EditClass', { name: 'Teste' })} mode="outlined">
                {/* <IconButton style={styles.geoIcon} icon="map-marker" size={20} onPress={() => console.log('Pressed')} /> */}
                <Card.Title title={c.name} subtitle={c.subtitle}/>
              </Card>
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
  card: {
    minHeight: 100,
    marginBottom: 15,
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
    backgroundColor: DarkTheme.colors.background,
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: 400,
    minWidth: 360,
  },
});