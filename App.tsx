import React from 'react';
import { Appbar, Avatar, Card, FAB, IconButton } from 'react-native-paper';
import { StyleSheet, View, PermissionsAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import BackgroundTask from 'react-native-background-task';

import * as cls from './class';

const defaultClass = new cls.Class('Português', [], true, 0, 7, {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
});

const DeleteClass = (classes, cls) => {
  classes.splice(classes.findIndex((c,i,a) => c.id == cls.id), 1);
}

const ClassCard = (props) => {
  const [gpsEnabled, setGpsEnabled] = React.useState(props.obj.gpsEnabled);

  return (
    <Card
      key={props.index}
      onPress={() => props.navigation.navigate('EditClass', {
        obj: props.obj,
        onSave: () => props.refreshClasses(),
        onDelete: (cls) => props.deleteClass(cls)
      })}
      style={props.index % 2 == 0 ? styles.cardPurple : styles.cardPink}
      mode="outlined">
      <IconButton style={gpsEnabled ? styles.geoIconEnabled : styles.geoIconDisabled} icon="map-marker" size={20} onPress={() => { setGpsEnabled(!gpsEnabled); props.obj.gpsEnabled = !gpsEnabled; console.log(props.obj.gpsEnabled); }} />
      <Card.Title titleStyle={styles.cardTitle} title={props.obj.name}/>
    </Card>
  );
}

const Main = ({ navigation, route }) => {
  const [active, setActive] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [classes, setClasses] = React.useState([
    defaultClass,
  ]);

  React.useEffect(() => {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Presencemeter GeoLocation Permission",
            message:
              "Presencemeter needs access to your GeoLocation " +
              "so it can manage your presence",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location")
        } else {
          console.log("location permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }

    requestLocationPermission();
    BackgroundTask.define(() => {
      console.log("Loucurada né pai");
      Geolocation.getCurrentPosition((info) => {
        let now = new Date();
        classes.forEach(cls => {
          cls.intervals.forEach(interval => {
            if (interval.begin.day.valueOf() == now.getDay() && interval.begin.time.hour <= now.getHours() && interval.begin.time.minutes <= now.getMinutes() && interval.end.time.hour >= now.getHours() && interval.end.time.minutes >= now.getMinutes()) {
              let distance = (a, b, x, y) => Math.sqrt(Math.pow(a - x, 2) + Math.pow(b - y, 2));
              if (distance(info.coords.latitude, info.coords.longitude, cls.region.latitude, cls.region.longitude) > cls.delta) {
                cls.misses++;
              }
            }
          });
        });
      BackgroundTask.finish();
      });
    });
    BackgroundTask.schedule();
  }, [])

  return (
    <View style={styles.mainView}>

      <Appbar.Header style={styles.appbar} statusBarHeight={5}>
        <Avatar.Image style={styles.avatar} size={50} source={require('./assets/avatar.jpeg')} />
        <Appbar.Content titleStyle={styles.title} title="Presencemeter" />
        <Appbar.Action style={styles.menu} icon="clock-check" onPress={() => navigation.navigate('ShowSchedulesClass', { classes: classes })} />
      </Appbar.Header>

      <ScrollView style={styles.cardsView}>
        {
          classes.map((c, i) => {
            return (
              <ClassCard key={i} obj={c} index={i} navigation={navigation} deleteClass={(cls) => { DeleteClass(classes, cls); setClasses([...classes]); }} refreshClasses={() => setClasses([...classes])} />
            );
          })
        }
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddClass', { onSubmit: (obj: cls.Class = null) => { if (obj != null) setClasses(classes.concat(obj)); } })}
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
    height: 100
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold'
  },
  avatar: {
    marginLeft: 10,
    marginTop: 5,
  },
  menu: {
    marginTop: 15,
  },
  cardsView: {
    margin: 20,
  },
  cardPurple: {
    height: 148,
    marginBottom: 15,
    backgroundColor: '#d1ccdc',
    borderColor: '#000000',
    borderRadius: 20,
    width: 289,
    alignSelf: 'center'
  },
  cardPink: {
    height: 148,
    marginBottom: 15,
    backgroundColor: '#f5edf0',
    borderColor: '#000000',
    borderRadius: 20,
    width: 289,
    alignSelf: 'center'
  },
  cardTitle: {
    marginBottom: 150,
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular'
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