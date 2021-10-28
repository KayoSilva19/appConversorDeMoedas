import React from 'react';

import RNPicker from 'react-native-picker-select';

export default function Picker(props) {
    const placeholder = {
        label: "Selecione Uma Moeda ",
        value: null,
        color: "#868786",


    }
    return (
        <RNPicker
            placeholder={placeholder}
            items={props.moedas}
            onValueChange={(valor) => props.onChange(valor)}
            style={{
                inputIOS: {
                    fontSize: 20,
                    color: "#000",

                },
                inputAndroid: {
                    fontSize: 20,
                    color: "#000",

                }

            }}
        />
    );
}