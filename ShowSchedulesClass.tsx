import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Avatar, FAB, Button, List } from 'react-native-paper';

import * as cls from './class';
import ClassCard from './App';

const ShowSchedulesClass = ({ route, navigation }) => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const presenceListMock = [{presence_id: 1, time: "10:30:12"}, {presence_id: 2, time: "10:37:49"} ];
    return (
        <View style={styles.mainView}>
            <Appbar.Header style={styles.appbar} statusBarHeight={5}>
                <Appbar.Content title="Presencemeter" subtitle="Lista de presenças" />
            </Appbar.Header>
            <ScrollView style={styles.page}>
                <List.Section>
                {
                    route.params.classes.map((c, i) => {
                        return (
                            <List.Accordion title={c.name} left={props => <List.Icon {...props} icon="folder" />}>
                            {
                                // Substituir presenceListMock pela lista de horários do c
                                presenceListMock.map((p, i) => {
                                    return (
                                        <List.Item title={p.time} key={i}/>
                                    );
                                })
                            }                         
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