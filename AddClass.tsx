import React from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Appbar, Avatar, TextInput, FAB, Title } from 'react-native-paper';

import * as cls from './class';

const FormText = (props) => {
    const [text, setText] = React.useState('');

    return (
        <View style={props.style}>
            <Text style={styles.formLabel}>{props.label}</Text>
            <TextInput
                mode='outlined'
                value={text}
                onChangeText={text => { setText(text); props.onChange(text); }}
            />
        </View>
    );
};

const FormNumber = (props) => {
    const [number, setNumber] = React.useState(0);

    return (
        <View style={props.style}>
            <Text style={styles.formLabel}>{props.label}</Text>
            <TextInput
                mode='outlined'
                value={number.toString()}
                onChangeText={text => { if (Number.isInteger(parseInt(text))) { setNumber(parseInt(text)); props.onChange(number); } }}
            />
        </View>
    );
};

const FormLocation = (props) => {
    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });


    return (
        <View style={props.style}>
            <Text style={styles.formLabel}>{props.label}</Text>
            <MapView style={styles.map}
                initialRegion={region}
                onRegionChange={region => { setRegion(region); props.onChange(region); }}
            >
                {<Marker
                    coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                />}
            </MapView>
        </View>
    );
};

const AddClass = ({ route, navigation }) => {
    const [name, setName] = React.useState('');
    const [maxMisses, setMaxMisses] = React.useState(0);
    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    return (
        <View style={styles.mainView}>
            <Appbar.Header style={styles.appbar} statusBarHeight={5}>
                <Avatar.Image style={styles.avatar} size={50} source={require('./assets/avatar.jpeg')} />
                <Appbar.Content title="Presencemeter" subtitle="Aula" />
                <Appbar.Action style={styles.cog} icon="cog" onPress={() => console.log("cog clicked")} />
            </Appbar.Header>
            <View style={styles.page}>
                <FormText label="Nome" style={styles.formText} onChange={setName} />
                <FormLocation label='Localização' style={styles.formText} onChange={setRegion} />
                <FormNumber label='Faltas máximas' style={[styles.formText, styles.faltasMaximas]} onChange={setMaxMisses} />
                <FAB
                    style={styles.fab}
                    label='Salvar'
                    onPress={() => { if (name.length > 0) { route.params.onSubmit(new cls.Class(name, [], region != null, 0, maxMisses, region)); navigation.goBack(); } }}
                />
            </View>
        </View>
    );
}

export default AddClass;

const styles = StyleSheet.create({
    mainView: {
        height: "100%",
    },
    page: {
        padding: 20,
    },
    formLabel: {
        fontWeight: 'bold',
        color: '#000000'
    },
    formText: {
        marginBottom: 15,
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
    text: {
        color: '#000000'
    },
    fab: {
        backgroundColor: '#4b963f'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 150,
        position: 'absolute'
    },
    faltasMaximas: {
        marginTop: 150
    }

});