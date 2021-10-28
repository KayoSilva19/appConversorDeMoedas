import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';

import Picker from './src/Components/Picker';
import api from './src/Services/api';

export default function conversor() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setmoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0);

  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get('all');

      let arrayMoedas = []
      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key
        })
      })

      setMoedas(arrayMoedas);
      setLoading(false);

    }
    loadMoedas();
  }, []);

  async function converter() {
    if(moedaSelecionada === null || moedaBValor === 0){
      alert("Por favor selecione uma moeda.")
      return;
    } 

    const response = await api.get(`all/${moedaSelecionada}-BRL`);
    // console.log(response.data[moedaSelecionada].ask)

    let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor));
    setValorConvertido(`R$ ${resultado.toFixed(2)}`);
    setValorMoeda(moedaBValor)

    Keyboard.dismiss();

  }

  if (loading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <ActivityIndicator color="#FFF" size={45} />
      </View>
    );

  } else {

    return (
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione sua moeda</Text>
          <Picker moedas={moedas} onChange={(moeda) => setmoedaSelecionada(moeda)} />
        </View>

        <View style={styles.areaValor}>
          <Text style={styles.titulo}> Digite um valor para converter em (R$)</Text>
          <TextInput
            placeholderTextColor="#868786"
            placeholder="EX: 150"
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(valor) => setMoedaBValor(valor)}
          />
        </View>
        <TouchableOpacity style={styles.botaoArea} onPress={converter}>
          <Text style={styles.botaoTexto}> Converter </Text>
        </TouchableOpacity>

        {valorConvertido != 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              {valorMoeda} {moedaSelecionada}
            </Text>
            <Text style={[styles.valorConvertido, { fontSize: 18, marginTop: 10 }]}>
              Corresponde a
            </Text>
            <Text style={styles.valorConvertido}>
              {valorConvertido}
            </Text>
          </View>
        )}

      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#101215",
    paddingTop: 40
  },
  areaMoeda: {
    width: '90%',
    backgroundColor: "#F9F9F9",
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1
  },
  titulo: {
    fontSize: 15,
    color: "#000",
    paddingTop: 5,
    paddingLeft: 5
  },
  areaValor: {
    width: '90%',
    backgroundColor: "#F9F9F9",
    paddingBottom: 9,
    paddingTop: 9
  },
  input: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: "#000"
  },
  botaoArea: {
    width: '90%',
    backgroundColor: "#FB4B57",
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botaoTexto: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: 'bold'
  },
  areaResultado: {
    width: '90%',
    backgroundColor: "#FFF",
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },
  valorConvertido: {
    fontSize: 39,
    fontWeight: 'bold',
    color: "#000"
  }
});