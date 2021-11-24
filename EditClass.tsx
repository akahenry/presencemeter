import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Avatar, Button, FAB, Dialog, Portal, Text, List, IconButton } from 'react-native-paper';

import * as cls from './class';
import { FormText, FormLocation, FormNumber, FormTime } from './forms';

const saveClass = (obj, name, maxMisses, region, schedule) => {
  obj.name = name;
  obj.maxMisses = maxMisses;
  obj.region = region;
  obj.intervals = schedule;
}

const DeleteConfirmDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={() => props.setVisible(false)}>
                <Dialog.Content>
                    <Text style={styles.deleteConfirmText} >Tem certeza que deseja excluir a classe? Esta ação é irreversível.</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => {props.setVisible(false); }}>
                        Cancelar
                    </Button>
                    <Button color={styles.deleteButtonColor} onPress={() => {props.setVisible(false); props.onDelete(); }}>
                        Excluir
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const EditClass = ({ route, navigation }) => {
    const [name, setName] = React.useState(route.params.obj.name);
    const [editMode, setEditMode] = React.useState(false);
    const [maxMisses, setMaxMisses] = React.useState(route.params.obj.maxMisses);
    const [region, setRegion] = React.useState(route.params.obj.region);
    const [schedule, setSchedule] = React.useState(route.params.obj.intervals);
    const [timeFormVisible, setTimeFormVisible] = React.useState(false);

    const [deleteDialogVisible, setDeleteDialogVisible] = React.useState(false);
    
    return (
        <View style={styles.mainView}>
            <Appbar.Header style={styles.appbar} statusBarHeight={5}>
                <Appbar.Content title="Presencemeter" subtitle="Editar Classe" />
            </Appbar.Header>
            <ScrollView style={styles.page}>
                <DeleteConfirmDialog
                    visible={deleteDialogVisible}
                    onDelete={() => { route.params.onDelete(route.params.obj); navigation.goBack(); } }
                    setVisible={setDeleteDialogVisible} />
                <FormTime
                    visible={timeFormVisible}
                    onAccept={(returnedTime) => setSchedule(schedule.concat(returnedTime)) }
                    setVisible={setTimeFormVisible} />

                <FormText label="Nome" defaultText={name} disabled={!editMode} style={styles.formText} onChange={setName} />
                <FormLocation label='Localização' enabled={editMode} defaultRegion={region} style={styles.formText} onChange={setRegion} />
                <FormNumber label='Faltas máximas' defaultText={maxMisses} disabled={!editMode} style={[styles.formText, styles.faltasMaximas]} onChange={ () => setMaxMisses } />
                <Text style={{fontWeight: "bold"}}>Faltas atuais: {route.params.obj.misses}</Text>
                <List.Section>
                    <Text>Horários</Text>
                    {
                        schedule.map((s: cls.DayHourInterval, i) => {
                            let begin: cls.DayHour = new cls.DayHour(s.begin.day, new cls.Hour(s.begin.time.hour, s.begin.time.minutes));
                            let end: cls.DayHour = new cls.DayHour(s.end.day, new cls.Hour(s.end.time.hour, s.end.time.minutes));
                            s = new cls.DayHourInterval(begin, end);
                            return (
                            <List.Item
                                style={styles.scheduleListItem}
                                key={i}
                                title={`${s.begin.toString()} - ${s.end.toString()}`}
                                left={() => <List.Icon icon="calendar-check" />}
                                right={() => {
                                    return (
                                        editMode ?
                                        <View style={{paddingTop: 15}}>
                                            <IconButton
                                                icon="delete"
                                                color={styles.deleteButtonColor}
                                                style={{ marginTop: 0 }}
                                                size={20}
                                                onPress={() => { schedule.splice(i, 1); setSchedule([...schedule]); }}
                                            />
                                        </View>
                                        :
                                        null
                                    );
                                }} />
                            );
                        })
                    }
                </List.Section>
                {
                    editMode ?
                    <View>
                        <Button icon="calendar-plus" mode="contained" onPress={() => setTimeFormVisible(true)}>Adicionar Horário</Button>
                        <FAB
                            style={styles.fab}
                            label="Salvar"
                            onPress={() => { setEditMode(false); route.params.onSave(); saveClass(route.params.obj, name, maxMisses, region, schedule); } }
                            icon={undefined}/>
                    </View>
                    :
                    <View style={{ marginTop: 15 }}>
                        <View style={{ flexDirection:"row" }}>
                            <Button icon="pencil" mode="outlined" style={styles.editButton} onPress={() => setEditMode(true)}>
                                Editar
                            </Button>
                            <Button icon="delete" mode="contained" color={styles.deleteButtonColor} style={styles.deleteButton} onPress={() => setDeleteDialogVisible(true) }>
                                Excluir
                            </Button>
                        </View>
                        <Button
                            icon="map-check"
                            mode="contained"
                            labelStyle={styles.markPresenceIcon}
                            style={styles.markPresenceButton}
                            onPress={() => { route.params.addPresence(new Date()); console.log(route.params.obj.presences); }}>
                            <Text style={styles.markPresenceLabel}>Marcar presença</Text>
                        </Button>
                    </View>
                }
                
            </ScrollView>
        </View>
    );
}

export default EditClass;

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
    faltasMaximas: {
        marginTop: 130
    },
    scheduleListItem: {
        marginBottom: -12,
        marginTop: -12,
        marginLeft: -10,
    },
    fab: {
        backgroundColor: '#4b963f',
        marginTop: 15,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    },

    editButton: {
        flex: 1,
        marginRight: 5,
    },
    deleteButton: {
        flex: 1,
        marginLeft: 5,
    },
    deleteConfirmText: {
        fontSize: 19
    },
    deleteButtonColor: "#d81a1a",

    markPresenceButton: {
        marginTop: 15,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markPresenceLabel: {
        fontSize: 15,
    },
    markPresenceIcon: {
        fontSize: 25,
    },
});