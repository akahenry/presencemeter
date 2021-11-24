import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, FAB, Button, List, IconButton } from 'react-native-paper';

import * as cls from './class';
import { FormText, FormLocation, FormNumber, FormTime } from './forms';

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
                <Appbar.Content title="Presencemeter" subtitle="Adicionar Classe" />
            </Appbar.Header>
            <ScrollView style={styles.page}>
                <FormText label="Nome" style={styles.formText} onChange={setName} />
                <FormLocation label='Localização' style={styles.formText} onChange={setRegion} />
                <FormNumber label='Faltas máximas' style={[styles.formText, styles.faltasMaximas]} onChange={setMaxMisses} />
                <FormTime visible={timeFormVisible} onAccept={(returnedTime) => setSchedule(schedule.concat(returnedTime))} setVisible={setTimeFormVisible} />
                <List.Section>
                    <Text style={styles.formLabel}>Horários</Text>
                    {
                        schedule.map((s: cls.DayHourInterval, i) => {
                            return (
                                <List.Item style={styles.scheduleListItem} key={i} title={`${s.begin.toString()} - ${s.end.toString()}`} left={() => <List.Icon icon="calendar-check" />} right={() => {
                                    return (
                                            <View style={{ paddingTop: 15 }}>
                                                <IconButton
                                                    icon="delete"
                                                    color={styles.deleteButtonColor}
                                                    style={{ marginTop: 0 }}
                                                    size={20}
                                                    onPress={() => { schedule.splice(i, 1); setSchedule([...schedule]); }}
                                                />
                                            </View>
                                    );
                                }} />
                            );
                        })
                    }
                </List.Section>
                <Button icon="calendar-plus" mode="contained" onPress={() => setTimeFormVisible(true)}>Adicionar Horário</Button>
                <FAB
                    style={styles.fab}
                    label="Salvar"
                    onPress={() => { if (name.length > 0) { route.params.onSubmit(new cls.Class(name, schedule, region != null, 0, maxMisses, region)); navigation.goBack(); } }}
                    icon={undefined} />
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
    faltasMaximas: {
        marginTop: 130
    },
    scheduleListItem: {
        marginBottom: -12,
        marginTop: -12,
        marginLeft: -10,
    },
    deleteButtonColor: "#d81a1a",

});