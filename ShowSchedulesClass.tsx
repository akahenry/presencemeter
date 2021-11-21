import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Avatar, FAB, Button, List } from 'react-native-paper';

import * as cls from './class';
import ClassCard from './App';

const ShowSchedulesClass = ({ route, navigation }) => {
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
    return (
        <View style={styles.mainView}>
            <Appbar.Header style={styles.appbar} statusBarHeight={5}>
                <Appbar.Content title="Presencemeter" subtitle="Editar Classe" />
            </Appbar.Header>
            <ScrollView style={styles.page}>
                <List.Section title="Accordions">
                    {
                       route.params.classes.map((m, i) => {
                            return (
                                <List.Accordion title={m.name} left={props => <List.Icon {...props} icon="folder" />}>
                                    {/* Listar presenças já marcadas dessa classe aqui.*/}
                                    {/* Lembre que é necessário uma key diferente pra cada List.Item */}
                                    <List.Item title="Primeiro item da lista de presenças já marcadas" />
                                </List.Accordion>
                            );
                       })
                    }
                </List.Section>
            </ScrollView>
        </View>
    );
}


export default ShowSchedulesClass;

const styles = StyleSheet.create({
    mainView: {
        height: "100%",
    },
    page: {
        padding: 20,
    },
    appbar: {
        marginBottom: 15,
        backgroundColor: '#17bebb'
    }
});