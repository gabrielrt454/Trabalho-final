import { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';

import servidor_real from '../utils/servidor_real'

export default function Adicionar({ navigation }) {
  const [nome, setNome] = useState('')
  const [tecnologia_id, setTecnologia] = useState('')
  const [preset, setPreset] = useState('')
  const [fps, setFps] = useState('')
  async function adicionarJogo() {
    let resp = await servidor_real.adicionarJogo({//o que é isso?
      nome: nome,
      tecnologia_id: tecnologia_id,
      preset: preset,
      fps:fps
    })
    if(resp) {//o que é isso?
      alert("Produto adicionado com sucesso")
      setNome("")
      setTecnologia("")
      setPreset("")
      setFps("")
    } else {
      alert("Erro ao tentar adicionar as informações")
    }
  }

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Adicionar informações dos testes" />
      </Appbar>

      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.item}
          label="Jogo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.item}
          label="tecnologia"
          value={tecnologia_id}
          onChangeText={setTecnologia}
        />

        <TextInput
          style={styles.item}
          label="Preset"
          value={preset}
          onChangeText={setPreset}
        />
        <TextInput
          style={styles.item}
          label="Fps adquirido"
          value={fps}
          onChangeText={setFps}
        />
        <Button
          mode="contained"
          style={styles.botao}
          icon="plus"
          onPress={adicionarJogo}>Adicionar
        </Button>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 20
  },
  item: {
    marginBottom: 5
  },
  botao: {
    marginTop: 20
  }
})