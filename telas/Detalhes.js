import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, TextInput, Appbar } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'

import servidor_real from '../utils/servidor_real'

export default function Adicionar({ route, navigation }) {
  const [id, setId] = useState('')
  const [nome, setJogo] = useState('')
  const [tecnologia_id, setTecnologia_id] = useState('')
  const [preset, setPreset] = useState('')
  const [fps, setFps] = useState('')
  const [tecnologias,setTecnologias] = useState([])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let tecnologias = await servidor_real.lerTecnologias()
      if (tecnologias) {
        setTecnologias(tecnologias)
      } else {
          
        setTecnologias("Erro ao tentar ler as tecnologias")
      }
    });
  
    return unsubscribe;
  }, [navigation])




  async function removerJogo() {
    let resp = await servidor_real.removerJogo({
      id: id,
      nome: nome,
      tecnologia: tecnologia_id,
      preset: preset,
      fps:fps
    })
    
    if(resp) {
      alert("Jogo removido")
      navigation.navigate("Principal")
    } else {
      alert("Erro ao remover o jogo")
    }
  }

  async function editarJogo() {
    let resp = await servidor_real.editarJogo({
      id: id,
      nome: nome,
      tecnologia_id: tecnologia_id,
      preset: preset,
      fps:fps
    })
    
    if(resp){
      alert("Informações atualizadas")
      navigation.navigate("Principal")
    } else {
      alert("Erro ao atualizar as informações")
    }
  }

  // configura os valores a partir dos que foram passados na navegação
  useEffect(() => {
    const jogo = route.params
    if (jogo) {
      setId(jogo.id)
      setJogo(jogo.nome)
      setTecnologia_id(jogo.tecnologia_id)//tecnologia_id ?
      setPreset(jogo.preset)
      setFps(jogo.fps)
    }
  }, [route.params])

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Detalhes" />
      </Appbar>

      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.item}
          label="ID"
          value={id}
          readOnly={true}
          onChangeText={setId}
        />
        
        <TextInput
          style={styles.item}
          label="Nome do jogo"
          value={nome}
          onChangeText={setJogo}
        />


        <Picker
        selectedValue={tecnologia_id}
        onValueChange={(tecnologia_id, idx) =>
          setTecnologia_id(tecnologia_id)
        }>
          
          {
            tecnologias.map((t) => (
              <Picker.Item 
              key={t.id} 
              label={t.tecnologias_nome} 
              value={t.id} />
            ))
          }
        </Picker>


        <TextInput
          style={styles.item}
          label="Tecnologia utilizada"
          value={tecnologia_id}
          onChangeText={setTecnologia_id}
        />

        <TextInput
          style={styles.item}
          label="Preset da super-resolução"
          value={preset}
          onChangeText={setPreset}
        />
        <TextInput
          style={styles.item}
          label="Quantidade de fps no 1% Low"
          value={fps}
          onChangeText={setFps}
        />
        <View style={styles.barraBotao}>
          <Button
            mode="contained"
            style={styles.botao}
            icon="delete"
            onPress={removerJogo}>Remover
          </Button>

          <Button
            mode="contained"
            style={styles.botao}
            icon="file-edit"
            onPress={editarJogo}>Editar
          </Button>
        </View>

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
    margin: 5,
    marginTop: 20,
    flexGrow: 1
  },
  barraBotao: {
    width: '100%',
    flexDirection: 'row'
  }
})