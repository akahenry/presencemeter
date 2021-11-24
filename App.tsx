import React from 'react';
import { Appbar, Card, FAB, IconButton, Paragraph } from 'react-native-paper';
import { AppState, StyleSheet, View, PermissionsAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import BackgroundTask from 'react-native-background-task';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as cls from './class';

const DeleteClass = (classes, cls) => {
  classes.splice(classes.findIndex((c,i,a) => c.id == cls.id), 1);
}

const DistanceBetweenPoints = (p1: {x: number, y: number}, p2: {x: number, y: number}) : number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

const ClassCard = (props) => {
  const [gpsEnabled, setGpsEnabled] = React.useState(props.obj.gpsEnabled);

  return (
    <Card
      key={props.index}
      onPress={() => props.navigation.navigate('EditClass', {
        obj: props.obj,
        onSave: () => props.refreshClasses(),
        onDelete: (cls) => props.deleteClass(cls),
        addPresence: (date: Date) => props.obj.addPresence(date)
      })}
      style={props.index % 2 == 0 ? styles.cardPurple : styles.cardPink}
      mode="outlined">
      <IconButton style={gpsEnabled ? styles.geoIconEnabled : styles.geoIconDisabled} icon="map-marker" size={20} onPress={() => { setGpsEnabled(!gpsEnabled); props.obj.gpsEnabled = !gpsEnabled; console.log(props.obj.gpsEnabled); }} />
      <Card.Title titleStyle={styles.cardTitle} title={props.obj.name}/>
      <Card.Content>
        <Paragraph style={[styles.cardContent, props.obj.maxMisses - props.obj.misses < 2 ? styles.missesRed : styles.missesNormal]}>{props.obj.misses}/{props.obj.maxMisses}</Paragraph> 
      </Card.Content>
    </Card>
  );
}

const Main = ({ navigation, route }) => {
  const [classes, setClasses] = React.useState([]);
  const [position, setPosition] = React.useState({latitude: 0, longitude: 0});

  const getClasses = () => {
    return classes;
  }

  React.useEffect(() => {
    let location = position
    cls.Class.defaultRegion = {...location, latitudeDelta: 0.25, longitudeDelta: 0.25}
    console.log(`Checking presence at location (${location.latitude}, ${location.longitude})`);
    console.log(classes);
    classes.forEach(obj => {
      let now = new Date(Date.now());
      let intersectedTime = false;
      obj.intervals.forEach(interval => {
        if (interval.inDate(now)) {
          intersectedTime = true;
        }
      });
      if (intersectedTime) {
        if(obj.gpsEnabled) {
          console.log(`Distancia entre os pontos: ${DistanceBetweenPoints({x: obj.region.latitude, y: obj.region.longitude}, {x: location.latitude, y: location.longitude})}`);
          if (DistanceBetweenPoints({x: obj.region.latitude, y: obj.region.longitude}, {x: location.latitude, y: location.longitude}) <= obj.delta) {
            console.log(`Adding presence at location (${location.latitude}, ${location.longitude}) in class ${obj.name}`);
            obj.addPresence(new Date(Date.now()));
          }
        } // TODO: Notify if gps is not enabled
      }
    });
  }, [position]);

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
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location");
        } else {
          console.log("Location permission denied");
        }
        const backgroundGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          {
            title: "Presencemeter GeoLocation Permission",
            message:
              "Presencemeter needs access to your GeoLocation " +
              "so it can manage your presence",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (backgroundGranted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location in background");
        } else {
          console.log("Background location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }

    Geolocation.watchPosition((response) => setPosition({latitude: response.coords.latitude, longitude: response.coords.longitude}), undefined, {enableHighAccuracy: true, maximumAge: 10, timeout:60000});

    BackgroundTask.define(() => {
      Geolocation.getCurrentPosition((response) => setPosition({latitude: response.coords.latitude, longitude: response.coords.longitude}), undefined, {enableHighAccuracy: true, maximumAge: 10, timeout:60000});
      BackgroundTask.finish();
    });

    BackgroundTask.schedule();

    requestLocationPermission();
  }, []);

  React.useEffect(() => {
    AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        console.log("Saving classes into storage");
        const jsonValue = JSON.stringify(getClasses());
        console.log(`Saving value: ${jsonValue}`);
        AsyncStorage.setItem('@presencemeter_classes', jsonValue).catch((error) => {
          if (error != null) {
            console.log(error);
          }
        });
      } else if (nextAppState === "active") {
      AsyncStorage.getItem('@presencemeter_classes').then((value) => {
        console.log("Reading classes from storage");
        if(value != null) {
          console.log(`Read value: ${value}`);
          let parsedValue: cls.Class[] = JSON.parse(value);
          let newClasses: cls.Class[] = [];
          parsedValue.forEach(element => {
            let intervals: cls.DayHourInterval[] = []
            element.intervals.forEach(interval => {
              let begin: cls.DayHour = new cls.DayHour(interval.begin.day, new cls.Hour(interval.begin.time.hour, interval.begin.time.minutes));
              let end: cls.DayHour = new cls.DayHour(interval.end.day, new cls.Hour(interval.end.time.hour, interval.end.time.minutes));
              intervals = intervals.concat(new cls.DayHourInterval(begin, end));
            });
            let newClass = new cls.Class(element.name, intervals, element.gpsEnabled, element.misses, element.maxMisses, element.region);
            element.presences.forEach(date => {
              const dateTimeReviver = function (key, value) {
                  var a;
                  if (typeof value === 'string') {
                      a = /\/Date\((\d*)\)\//.exec(value);
                      if (a) {
                          return new Date(+a[1]);
                      }
                  }
                  return value;
              }
              newClass.addPresence(new Date(JSON.parse(JSON.stringify(date), dateTimeReviver)));
            });
            newClasses = newClasses.concat(newClass);
          });
          setClasses(newClasses);
        }
      });
      }
    });
  }, [classes]);

  return (
    <View style={styles.mainView}>

      <Appbar.Header style={styles.appbar} statusBarHeight={5}>
        <Appbar.Content titleStyle={styles.title} title="Presencemeter" />
        <Appbar.Action style={styles.menu} icon="clock-check" size={50} color="#fff" onPress={() => { setClasses([...classes]); navigation.navigate('ShowSchedulesClass', { classes: classes }); }} />
             
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
        icon="plus" color="#fff"
        onPress={() => navigation.navigate('AddClass', { onSubmit: (obj: cls.Class = null) => { if (obj != null) setClasses(classes.concat(obj)); }, initialRegion: cls.Class.defaultRegion})}
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
    height: 100,
    flexDirection: "column"
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 35,
    height: 70,
    color: '#fff'
  },
  menu: {
    marginLeft: 10,
    marginTop: 35
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
    // marginBottom: 150,
    marginTop: -40,
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular'
  },
  cardContent: {
    fontSize: 20,
    marginTop: 10
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
  },
  missesRed: {
    color: '#d11'
  },
  missesNormal: {
    color: '#000'
  }
});