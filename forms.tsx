import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TextInput, Dialog, Portal, Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

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
    const [day, setDay] = React.useState("");
    const [hourStart, setHourStart] = React.useState("");
    const [hourEnd, setHourEnd] = React.useState("");
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
                        value={hourStart}
                        onChangeText={text => setHourStart(text)}
                        label='Horário de Início'
                    />
                    <TextInput
                        mode='outlined'
                        value={hourEnd}
                        onChangeText={text => setHourEnd(text)}
                        label='Horário de Término'
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => {props.setVisible(false); props.onAccept({day, hourStart, hourEnd}); }}>Adicionar</Button>
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