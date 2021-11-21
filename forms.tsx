import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TextInput, Dialog, Portal, Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

import * as cls from './class';

export const FormText = (props) => {
    const [text, setText] = React.useState(props.defaultText);

    return (
        <View style={props.style}>
            <Text style={styles.formLabel}>{props.label}</Text>
            <TextInput
                mode='outlined'
                value={text}
                disabled={props.disabled}
                onChangeText={text => { setText(text); props.onChange(text); }}
            />
        </View>
    );
};

FormText.defaultProps = {
  defaultText: '',
  disabled: false,
}


export const FormNumber = (props) => {
    const [number, setNumber] = React.useState(props.defaultText);

    React.useEffect(() => {
        props.onChange(number);
    }, [number]);

    return (
        <View style={props.style}>
            <Text style={styles.formLabel}>{props.label}</Text>
            <TextInput
                mode='outlined'
                value={number.toString()}
                disabled={props.disabled}
                onChangeText={text => { if (Number.isInteger(parseInt(text))) { setNumber(parseInt(text)); } }}
            />
        </View>
    );
};

export const FormHourMinute = (props) => {
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);

    React.useEffect(() => {
        props.onChange(hours, minutes);
    }, [hours, minutes]);

    return (
        <View style={props.style}>
            <Text style={styles.formLabel}>{props.label}</Text>
            <View style={{flexDirection:"row"}}>
            <TextInput
                style={{flex:1, marginRight:5}}
                mode='outlined'
                value={hours.toString()}
                disabled={props.disabled}
                onChangeText={text => { 
                    let nr = parseInt(text);
                    if (Number.isInteger(nr)) {
                        let max = 23;
                        let min = 0;
                        if (nr >= min) {
                            if (nr <= max) {
                                setHours(nr); 
                            } else {
                                setHours(max);
                            }
                        } else {
                            setHours(min);
                        }
                    } else {
                        setHours(0);
                    }
                }}
            />
            <Text style={{fontSize:50}}>:</Text>
            <TextInput
                style={{flex:1, marginLeft:5}}
                mode='outlined'
                value={minutes.toString()}
                disabled={props.disabled}
                onChangeText={text => { 
                    let nr = parseInt(text);
                    if (Number.isInteger(nr)) {
                        let max = 59;
                        let min = 0;
                        if (nr >= min) {
                            if (nr <= max) {
                                setMinutes(nr); 
                            } else {
                                setMinutes(max);
                            }
                        } else {
                            setMinutes(min);
                        }
                    } else {
                        setMinutes(0);
                    }
                }}
            />
            </View>
        </View>
    );
};

FormNumber.defaultProps = {
  defaultText: '',
  disabled: false,
}

export const FormLocation = (props) => {
    const [region, setRegion] = React.useState(props.defaultRegion);


    return (
        <View style={props.style}>
            <Text style={styles.formLabel}>{props.label}</Text>
            <MapView style={styles.map}
                initialRegion={region}
                onRegionChange={region => { setRegion(region); props.onChange(region); }}
                scrollEnabled={props.enabled}
                zoomEnabled={props.enabled}
            >
                {<Marker
                    coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                />}
            </MapView>
        </View>
    );
};

FormLocation.defaultProps = {
  defaultRegion: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    },
  enabled: true,
}

export const FormTime = (props) => {
    const [showDropDown, setShowDropDown] = React.useState(false);
    const [day, setDay] = React.useState(cls.Weekday.Sunday);
    const [hourStart, setHourStart] = React.useState(0);
    const [minuteStart, setMinuteStart] = React.useState(0);
    const [hourEnd, setHourEnd] = React.useState(0);
    const [minuteEnd, setMinuteEnd] = React.useState(0);
    const dayList = [
        {
        label: "Segundas",
        value: cls.Weekday.Monday,
        },
        {
        label: "Terças",
        value: cls.Weekday.Tuesday,
        },
        {
        label: "Quartas",
        value: cls.Weekday.Wednesday,
        },
        {
        label: "Quintas",
        value: cls.Weekday.Thursday,
        },
        {
        label: "Sextas",
        value: cls.Weekday.Friday,
        },
        {
        label: "Sábados",
        value: cls.Weekday.Saturday,
        },
        {
        label: "Domingos",
        value: cls.Weekday.Sunday,
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
                    <FormHourMinute
                        onChange={(hour, minutes) => {setHourStart(hour); setMinuteStart(minutes)}}
                        label='Horário de início'
                    />
                     <FormHourMinute
                        onChange={(hour, minutes) => {setHourEnd(hour); setMinuteEnd(minutes)}}
                        label='Horário de fim'
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => {props.setVisible(false); props.onAccept(new cls.DayHourInterval(new cls.DayHour(day, new cls.Hour(hourStart, minuteStart)), new cls.DayHour(day, new cls.Hour(hourEnd, minuteEnd)))); }}>Adicionar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    formLabel: {
        fontWeight: 'bold',
        color: '#000000'
    },
    map: {
            ...StyleSheet.absoluteFillObject,
            height: 150,
            position: 'absolute'
        },
});