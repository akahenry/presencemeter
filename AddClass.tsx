import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Appbar, Avatar, TextInput, FAB, Button, Dialog, Portal, List } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

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

const FormTime = (props) => {
    const [showDropDown, setShowDropDown] = React.useState(false);
    const [day, setDay] = React.useState("");
    const [hours, setHours] = React.useState("");
    const dayList = [
        {
        label: "Segundas",
        value: "Segundas",
        },
        {
        label: "Terças",
        value: "Terças",
        },
        {
        label: "Quartas",
        value: "Quartas",
        },
        {
        label: "Quintas",
        value: "Quintas",
        },
        {
        label: "Sextas",
        value: "Sextas",
        },
        {
        label: "Sábados",
        value: "Sábados",
        },
        {
        label: "Domingos",
        value: "Domingos",
        },
    ];

    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={() => props.setVisible(false)}>
                <Dialog.Title>Escolha um horário</Dialog.Title>
                <Dialog.Content>
                    <DropDown
                        label={"Dia da Semana"}
                        mode={"outlined"}
                        visible={showDropDown}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}
                        value={day}
                        setValue={setDay}
                        list={dayList}
                    />
                    <TextInput
                        mode='outlined'
                        value={hours}
                        onChangeText={text => setHours(text)}
                        label='Horário'
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => {props.setVisible(false); props.onAccept({day, hours}); }}>Adicionar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const AddClass = ({ route, navigation }) => {
    const [name, setName] = React.useState('');
    const [maxMisses, setMaxMisses] = React.useState(0);
    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [timeFormVisible, setTimeFormVisible] = React.useState(false);
    const [schedule, setSchedule] = React.useState([])

    return (
        <View style={styles.mainView}>
            <Appbar.Header style={styles.appbar} statusBarHeight={5}>
                <Avatar.Image style={styles.avatar} size={50} source={require('./assets/avatar.jpeg')} />
                <Appbar.Content title="Presencemeter" subtitle="Aula" />
                <Appbar.Action style={styles.cog} icon="cog" onPress={() => console.log("cog clicked")}/>
            </Appbar.Header>
            <ScrollView style={styles.page}>
                <FormText label="Nome" style={styles.formText} onChange={setName} />
                <FormLocation label='Localização' style={styles.formText} onChange={setRegion} />
                <FormNumber label='Faltas máximas' style={[styles.formText, styles.faltasMaximas]} onChange={setMaxMisses} />
                <FormTime visible={timeFormVisible} onAccept={(returnedTime) => setSchedule(schedule.concat(returnedTime)) } setVisible={setTimeFormVisible} />
                <List.Section>
                    <Text style={styles.formLabel}>Horários</Text>
                    {
                        schedule.map((s, i) => {
                            return (
                            <List.Item style={styles.scheduleListItem} key={i} title={`${s.day} - ${s.hours}`} left={() => <List.Icon icon="calendar-check" />} />
                            );
                        })
                    }
                </List.Section>
                <Button icon="calendar-plus" mode="contained" onPress={() => setTimeFormVisible(true)}>Adicionar Horário</Button>
                <FAB
                    style={styles.fab}
                    label="Salvar"
                    onPress={() => { if (name.length > 0) { route.params.onSubmit(new cls.Class(name, [], region != null, 0, maxMisses, region)); navigation.goBack(); } } }
                    icon={undefined}/>
            </ScrollView>
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
        backgroundColor: '#4b963f',
        marginTop: 15,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 150,
        position: 'absolute'
    },
    faltasMaximas: {
        marginTop: 150
    },
    scheduleListItem: {
        marginBottom: -12,
        marginTop: -12,
        marginLeft: -10,
    }

});