import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Avatar, FAB, Button, List } from 'react-native-paper';

import * as cls from './class';
import ClassCard from './App';

const formatDate = (date) => {
    return `${cls.zeroPad(date.getDate(), 2)}/${cls.zeroPad(date.getMonth(), 2)}/${cls.zeroPad(date.getFullYear() - 2000, 2)} - ${cls.weekdayToString(date.getDay())}, ${cls.zeroPad(date.getHours(), 2)}:${cls.zeroPad(date.getMinutes(), 2)}`;
}

const ShowSchedulesClass = ({ route, navigation }) => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
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
                            <List.Accordion title={c.name} key={i} left={props => <List.Icon {...props} icon="clock-check" />}>
                            {
                                c.presences.map((p, i) => {
                                    return (
                                        <List.Item title={formatDate(p)} key={i}/>
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