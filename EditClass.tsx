import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Avatar, Button, FAB } from 'react-native-paper';

import * as cls from './class';
import { FormText } from './forms';

const saveClass = (obj, name, maxMisses, region, schedule) => {
  obj.name = name;
  obj.maxMisses = maxMisses;
  obj.region = region;
  obj.schedule = schedule;
}

const EditClass = ({ route, navigation }) => {
    const [name, setName] = React.useState(route.params.obj.name);
    const [editMode, setEditMode] = React.useState(false);
    const [maxMisses, setMaxMisses] = React.useState(0);
    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [schedule, setSchedule] = React.useState([])

    return (
        <View style={styles.mainView}>
            <Appbar.Header style={styles.appbar} statusBarHeight={5}>
                <Avatar.Image style={styles.avatar} size={50} source={require('./assets/avatar.jpeg')} />
                <Appbar.Content title="Presencemeter" subtitle="Editar Classe" />
                <Appbar.Action style={styles.cog} icon="cog" onPress={() => console.log("cog clicked")}/>
            </Appbar.Header>
            <ScrollView style={styles.page}>
                <FormText defaultText={name} disabled={!editMode} label="Nome" style={styles.formText} onChange={setName} />
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
                        <Button icon="delete" mode="contained" color="#d81a1a" style={styles.deleteButton} onPress={() => console.log('Delete Pressed')}>
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
    }
});