import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Avatar, Button, FAB, Dialog, Portal, Text } from 'react-native-paper';

import { FormText, FormLocation, FormNumber } from './forms';

const saveClass = (obj, name, maxMisses, region, schedule) => {
  obj.name = name;
  obj.maxMisses = maxMisses;
  obj.region = region;
  obj.schedule = schedule;
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
    const [schedule, setSchedule] = React.useState([]);

    const [deleteDialogVisible, setDeleteDialogVisible] = React.useState(false);
    
    return (
        <View style={styles.mainView}>
            <Appbar.Header style={styles.appbar} statusBarHeight={5}>
                <Avatar.Image style={styles.avatar} size={50} source={require('./assets/avatar.jpeg')} />
                <Appbar.Content title="Presencemeter" subtitle="Editar Classe" />
                <Appbar.Action style={styles.cog} icon="cog" onPress={() => console.log("cog clicked")}/>
            </Appbar.Header>
            <ScrollView style={styles.page}>
                <DeleteConfirmDialog
                    visible={deleteDialogVisible}
                    onDelete={() => { route.params.onDelete(route.params.obj); navigation.goBack(); } }
                    setVisible={setDeleteDialogVisible} />
                <FormText label="Nome" defaultText={name} disabled={!editMode} style={styles.formText} onChange={setName} />
                <FormLocation label='Localização' enabled={editMode} defaultRegion={region} style={styles.formText} onChange={setRegion} />
                <FormNumber label='Faltas máximas' defaultText={maxMisses} disabled={!editMode} style={[styles.formText, styles.faltasMaximas]} onChange={ () => setMaxMisses } />
                {
                    editMode ?
                    <FAB
                        style={styles.fab}
                        label="Salvar"
                        onPress={() => { setEditMode(false); route.params.onSave(); saveClass(route.params.obj, name, maxMisses, region, schedule); } }
                        icon={undefined}/>
                    :
                    <View style={{ flexDirection:"row" }}>
                        <Button icon="pencil" mode="outlined" style={styles.editButton} onPress={() => setEditMode(true)}>
                            Editar
                        </Button>
                        <Button icon="delete" mode="contained" color={styles.deleteButtonColor} style={styles.deleteButton} onPress={() => setDeleteDialogVisible(true) }>
                            Excluir
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
});